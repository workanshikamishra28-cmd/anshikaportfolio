const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 border-t-4 border-primary relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div className="relative">
            <h3 className="text-3xl font-bold">Anshika</h3>
            <div className="absolute -bottom-2 left-0 w-20 h-2 bg-accent collage-rotate-1"></div>
          </div>

          {/* Social links */}
          <div className="text-center space-y-2">
            <div className="text-sm font-bold mb-3">Follow Me</div>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-accent transition-colors text-lg">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors text-lg">Behance</a>
              <a href="#" className="hover:text-accent transition-colors text-lg">LinkedIn</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-right text-sm text-muted-foreground">
            <p>© {currentYear} Anshika</p>
            <p className="italic">All rights reserved</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-1/4 text-2xl opacity-20">✦</div>
        <div className="absolute top-4 right-1/3 text-xl opacity-20">★</div>
      </div>
    </footer>
  );
};

export default Footer;
