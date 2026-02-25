import Navbar from '../Navbar';
import { ThemeProvider } from '../ThemeProvider';

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <Navbar onContactOpen={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </ThemeProvider>
  );
}
