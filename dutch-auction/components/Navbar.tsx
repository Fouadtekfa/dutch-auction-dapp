import Link from 'next/link';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/menu" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            En cours
            </span>
          </Link>
          <Link href="/win" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Encheres Gagnés
            </span>
          </Link>
          <Link href="/" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Encheres Perdus

            </span>
          </Link>
        </div>


        
      </nav>
    );
  };
  

export default Navbar;