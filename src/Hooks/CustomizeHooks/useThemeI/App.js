import { ThemeProvider } from './useTheme';
import { ThemedButton, ThemedDiv } from './ChildComponents';

export default function App() {
  // Step 4: 使用 自定义 Context Provider Component - ThemeProvider
  return (
    <ThemeProvider>
      <ThemedButton />
      <ThemedDiv />
    </ThemeProvider>
  );
}
