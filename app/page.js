import { redirect } from 'next/navigation';

// Root path always redirects to login.
// Logged-in users are redirected to their dashboard by AuthContext.
export default function RootPage() {
  redirect('/login');
}
