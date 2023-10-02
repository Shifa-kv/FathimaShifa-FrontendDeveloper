import BannerImage from '../assets/images/banner_image.jpg'

const Banner = () => {
  return (
    <div className="bg-gradient-to-t from-indigo-950 to-sky-800 pt-12 sm:py-10 overflow-hidden">
      <div className="container mx-auto flex items-center sm:block">
        <div className="w-1/2 md:w-full">
          <h1 className="text-6xl lg:text-4xl text-amber-200 mb-9 lg:mb-6">
            Discover<br />
            <span className=' font-extrabold text-8xl lg:text-6xl text-cyan-200'>Capsules</span> <br />
            world here
          </h1>
          <p className="text-lg text-cyan-100 mb-6 sm:mb-4 w-5/6 md:w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
            justo euismod, aliquet mauris non, consectetur orci.
          </p>
        </div>
        <div className="w-1/2 mt-6 lg:mt-0 flex justify-end self-end sm:hidden">
          <img
            src={BannerImage}
            alt="Banner"
            className="rounded-lg shadow-lg rounded-t-full w-[80%] "
          />
        </div>
      </div>
    </div>

  )
}
export default Banner