import Link from 'next/link';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/menu" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Link1
            </span>
          </Link>

          <Link href="/" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Link2
            </span>
          </Link>
          <Link href="/" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Link3
            </span>
          </Link>
          <Link href="/" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Link4

            </span>
          </Link>

          <Link href="/" passHref>
            <span className="cursor-pointer text-white font-bold text-lg hover:text-cyan-300 transition duration-300 ease-in-out">
            Link5
            </span>
          </Link>

        </div>


        
      </nav>
    );
  };
  

export default Navbar;