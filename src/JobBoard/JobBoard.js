import React, { useState, useEffect } from 'react';
import { Job } from './Job';
import './jobbord.css';

const PAGE_SIZE = 6;

export const JobBoard = () => {
  const [page, setPage] = useState(0);
  const [fetchingJobDetails, setFetchingJobDetails] = useState(false);
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs(page);
  }, [page]); // 随着Page的变化来fetch jobs

  async function fetchJobIds(currPage) {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json'
      );
      jobs = await res.json();
      setJobIds(jobs);
    }

    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
  }

  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);

    setFetchingJobDetails(true);
    //要用promise.all
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (res) => res.json()
        )
      )
    );
    setJobs([...jobs, ...jobsForPage]);

    setFetchingJobDetails(false);
  }

  return (
    <div className='app'>
      <h1 className='title'>Hacker News Jobs Board</h1>

      {jobIds == null ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div>
          <div className='jobs' role='list'>
            {jobs.map((job) => (
              <Job key={job.id} detail={job} />
            ))}
          </div>

          {jobs.length > 0 && page * PAGE_SIZE + PAGE_SIZE < jobIds.length && (
            <button
              className='load-more-button'
              disabled={fetchingJobDetails}
              // update page here, then if page changed, because useEffect logic, it will fetch next 6 Jsobs automatically
              onClick={() => setPage(page + 1)}
            >
              {fetchingJobDetails ? 'Loading...' : 'Load more jobs'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
