import NavbarProfile from '../components/navBarProfile';

export default function ConfigLayout({ children }: any) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="p-1 border border-primary-100 rounded-lg">
        <NavbarProfile />
      </div>
      {children}
    </main>
  );
}
