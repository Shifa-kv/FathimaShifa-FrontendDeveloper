import { useState } from 'react';
import { useSelector } from 'react-redux';

const Main = () => {
    const Capsules = useSelector((state) => state.capsules);
    const isLoading = useSelector((state) => state.isLoading);
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [popupData, setPopupData] = useState({ status: false });
    const [Filter, setFilter] = useState({});

    // Calculate the staring and ending index of data on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Find unique search form value from data
    const allStatus = [...new Set(Capsules.map((rocket) => rocket.status))];
    const allTypes = [...new Set(Capsules.map((rocket) => rocket.type))];
    const allLaunchDate = [...new Set(Capsules.filter((data) => !!data.original_launch).map((rocket) => {
        const date = new Date(rocket.original_launch);
        return date.getFullYear()
    }))];

    // Filter data
    const handleFilter = (e) => {
        const { name, value } = e.target;
        setFilter({ ...Filter, [name]: value })
        setCurrentPage(1)
    }
    const filteredCapsules = Capsules.filter((capsule) => {
        let launchYear = new Date(capsule.original_launch).getFullYear()
        return (
            (!Filter.status || capsule.status == Filter.status) &&
            (!Filter.type || capsule.type == Filter.type) &&
            (!Filter.launch || launchYear == Filter.launch)
        )
    })

    // Function to handle page change on pagination button click
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Convert date in to local date and time string
    const formateDate = (value) => {
        const date = new Date(value);
        const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return { date: dateString, time: timeString }
    }


    return (
        <main className=' container my-20 sm:my-10'>
            {/* Search form */}
            <form className=' mb-5 grid grid-cols-5 gap-3 lg:grid-cols-3 sm:grid-cols-2'>
                <fieldset className='relative '>
                    <label className='block text-sm absolute -top-2 left-3 bg-white px-1' htmlFor='status'>
                        Status
                    </label>
                    <select
                        name='status'
                        id='status'
                        onChange={handleFilter}
                        className='bg-white border-2 capitalize  border-cyan-200 pb-2 pt-3 px-2 w-full focus:border-cyan-500 shadow-md focus:outline-0 '
                    >
                        <option value=''>Select status</option>
                        {allStatus.map((data, index) => (
                            <option value={data} key={index} className='text-black'>{data}</option>
                        ))
                        }
                    </select>
                </fieldset>
                <fieldset className='relative '>
                    <label className='block text-sm absolute -top-2 left-3 bg-white px-1' htmlFor='type'>Type</label>
                    <select
                        name='type'
                        id='type'
                        onChange={handleFilter}
                        className='bg-white border-2 capitalize  border-cyan-200 pb-2 pt-3 px-2 w-full focus:border-cyan-500 shadow-md focus:outline-0 '
                    >
                        <option value=''>Select type</option>
                        {allTypes.map((data, index) => (
                            <option value={data} key={index} className='text-black'>{data}</option>
                        ))
                        }
                    </select>
                </fieldset>
                <fieldset className='relative sm:col-span-2'>
                    <label className='block text-sm absolute -top-2 left-3 bg-white px-1' htmlFor='launch'>Orginal launch year</label>
                    <select
                        name='launch'
                        id='launch'
                        onChange={handleFilter}
                        className='bg-white border-2 capitalize  border-cyan-200 pb-2 pt-3 px-2 w-full focus:border-cyan-500 shadow-md focus:outline-0 '
                    >
                        <option value=''>Select year</option>
                        {allLaunchDate.map((data, index) => (
                            <option value={data} key={index} className='text-black'>{data}</option>
                        ))
                        }
                    </select>
                </fieldset>
            </form>

            {/* Data grid */}
            {isLoading ?(
                // loading indicator
                <div className='text-center py-5' data-testid="loading-indicator">
                    <div className="flex justify-center items-center ">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            ):(
                filteredCapsules.length != 0 ?
                    <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 gap-y-9'>
                        {filteredCapsules.slice(startIndex, endIndex).sort((a, b) => a.capsule_serial.localeCompare(b.capsule_serial)).map((data) => (
                            <article
                                key={data.capsule_serial}
                                className='flex cursor-pointer even:bg-cyan-200 even:text-indigo-950 odd:text-cyan-200 odd:bg-indigo-950 flex-col border border-gray-300 shadow-xl rounded-lg overflow-hidden'
                                onClick={() => { setPopupData({ status: true, data }) }}
                            >
                                <div className=' flex flex-col justify-center items-center p-4 '>
                                    <p className='bg-amber-200 py-1 px-2 rounded-md font-bold uppercase text-xs text-indigo-950'>
                                        {data.status}
                                    </p>
                                    <h2 className=' text-2xl lg:text-xl  text-center'>
                                        {data.type} - {data.capsule_serial}
                                    </h2>
                                </div>
                                <div className='text-center p-5  h-full bg-white text-indigo-950'>
                                    <p>{data.details}</p>
                                    {data.original_launch &&
                                        <p className='text-sm text-gray-400 '>
                                            Launched on <b>{formateDate(data.original_launch).date}</b>
                                        </p>
                                    }
                                </div>
                            </article>
                        ))}

                    </div>
                    :
                    <div className='text-center py-5'>
                        <h2>Oh oh, No capsules found !</h2>
                    </div>
            )}

            {/* Pagination */}
            {filteredCapsules.length != 0 &&
                <nav className="col-span-3 flex justify-center mt-9 gap-x-1 ">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-amber-200  px-4 py-2 rounded-l-md border border-cyan-800  disabled:text-gray-400 disabled:bg-white"
                    >
                        Previous
                    </button>
                    {Array.from({ length: Math.ceil(filteredCapsules.length / itemsPerPage) })
                        .map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                                className="bg-amber-200  px-4 py-2 border border-cyan-800 disabled:text-gray-400 disabled:bg-white"
                            >
                                {index + 1}
                            </button>
                        )
                        )}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={endIndex >= filteredCapsules.length}
                        className="bg-amber-200  px-4 py-2 rounded-r-md border border-cyan-800  disabled:text-gray-400 disabled:bg-white"
                    >
                        Next
                    </button>
                </nav>
            }
            {/* Popup listing capsule details */}
            {popupData?.status &&
                <div className="fixed inset-0 grid overflow-y-auto 	py-5 items-center justify-center z-50 bg-[#0000008c]">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md relative mx-3" >
                        <button
                            className="mt-4 bg-black rounded-full text-xs absolute right-2 top-1 text-white font-bold py-1 px-2 "
                            onClick={() => { setPopupData({ status: false }) }}
                        >
                            X
                        </button>
                        <div className='pb-4 pt-6 px-10 sm:px-5 bg-amber-200'>
                            <h3 className='text-2xl'>{popupData.data.type}</h3>
                            <p>{popupData.data.capsule_serial}</p>
                        </div>
                        <ul className='border-t px-10 py-6 sm:px-5 grid gap-y-2'>
                            <li className='flex gap-x-2'>
                                <strong>Status:</strong> {popupData.data.status}
                            </li>
                            {popupData.data.original_launch &&
                                <li className='flex gap-x-2'>
                                    <strong>Original Launch:</strong>
                                    {formateDate(popupData.data.original_launch).date + ', ' + formateDate(popupData.data.original_launch).time}
                                </li>
                            }
                            {popupData.data.missions.length != 0 &&
                                <li className='flex gap-x-2'>
                                    <strong>Missions:</strong>
                                    <ul>
                                        {popupData.data.missions.map((mission, index) => (
                                            <li key={index} className=''>
                                                {mission.name} (Flight {mission.flight})
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            }
                            <li className='flex gap-x-2'>
                                <strong>Landings:</strong> {popupData.data.landings}
                            </li>

                            <li className='flex gap-x-2'>
                                <strong>Reuse Count:</strong> {popupData.data.reuse_count}
                            </li>
                            {popupData.data.details &&
                                <li className='flex gap-x-2 border-t-2 py-2 text-left border-gray-300'>
                                    {popupData.data.details}
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            }
        </main>
    )
}
export default Main