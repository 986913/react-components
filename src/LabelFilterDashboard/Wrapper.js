import { useState } from 'react';
import './labelfilter.css';

const animalData = [
  { name: 'Eagle', class: 'Birds' },
  { name: 'Penguin', class: 'Birds' },
  { name: 'Parrot', class: 'Birds' },
  { name: 'Lion', class: 'Mammals' },
  { name: 'Tiger', class: 'Mammals' },
  { name: 'Elephant', class: 'Mammals' },
  { name: 'Cobra', class: 'Reptiles' },
  { name: 'Lizard', class: 'Reptiles' },
  { name: 'Tortoise', class: 'Reptiles' },
  { name: 'Salmon', class: 'Fish' },
  { name: 'Shark', class: 'Fish' },
  { name: 'Trout', class: 'Fish' },
];

const classNames = (...args) => {
  return args.filter(Boolean).join(' ');
};

export const LabelFilterDashboardWrapper = () => {
  const animalClasses = Array.from(
    new Set(animalData.map((animal) => animal.class)),
  );
  const [allSelectedClasses, setAllSelected] = useState([]);

  const handleOnClick = (animalClass) => {
    setAllSelected((prevSelected) => {
      if (prevSelected.includes(animalClass)) {
        return prevSelected.filter((c) => c !== animalClass);
      } else {
        return [...prevSelected, animalClass];
      }
    });
  };

  const visibleData = animalData.filter((animal) => {
    return allSelectedClasses.includes(animal.class);
  });

  return (
    <div className='wrapper'>
      <div data-testid='labels-wrapper-id' className='label-container'>
        {animalClasses.map((animalClass) => (
          <div
            data-testid='label-id'
            className={classNames(
              'label',
              allSelectedClasses.includes(animalClass) && 'selected',
            )}
            key={animalClass}
            onClick={() => handleOnClick(animalClass)}
          >
            {animalClass}
          </div>
        ))}
      </div>

      <div data-testid='tile-container-id' className='tile-container'>
        {visibleData.map((animal) => (
          <div data-testid='animal-tile-id' className='tile' key={animal.name}>
            {animal.name}
          </div>
        ))}
      </div>
    </div>
  );
};
