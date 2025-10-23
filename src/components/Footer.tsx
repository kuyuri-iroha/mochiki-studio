export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 w-full border-t border-slate-200 bg-white/80 px-6 py-8" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: '400px 400px', backgroundRepeat: 'repeat' }}>
      <div className="mx-auto max-w-6xl text-center text-sm text-slate-600">
        &copy; {year} Mochiki Studio. All rights reserved.
      </div>
    </footer>
  );
}
