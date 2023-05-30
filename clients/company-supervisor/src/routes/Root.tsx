import { useEffect, useState } from 'react';
import { InternshipRow } from '../components/InternshipRow';
import { Internship } from '../types/InternshipType';
import { PaginationButton } from '../components/PaginationButton';

export const Root = ({ _companyId }: { _companyId: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [internships, setInternships] = useState<Internship[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  useEffect(() => {
    fetchInternships(currentPage);
  }, []);

  const fetchInternships = (number: number) => {
    console.log(number);
    fetch(`/api/internship/companyid/${_companyId}?pageNo=${number - 1}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
        setLoading(false);
        setInternships(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchInternships(pageNumber);
  };

  const decreasePageNumber = () => {
    if (currentPage != 1) {
      handleClick(currentPage - 1);
    }
  };

  const increasePageNumber = () => {
    if (currentPage != totalPages) {
      handleClick(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-center">
        <div className="container max-w-screen px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
              <h2 className="text-2xl leading-tight">Stajlar</h2>
              <div className="text-end">
                <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                  <div className=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Öğrenci Adı"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                    type="submit"
                  >
                    Ara
                  </button>
                </form>
              </div>
            </div>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-10 sm:px-10">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Öğrenci Adı
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Öğrenci Soyadı
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Gün
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Başlangıç Zamanı
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Bitiş Zamanı
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Durum
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Seçenekler
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships?.map((int: Internship) => (
                      <InternshipRow key={int.id} internship={int} />
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                      onClick={() => decreasePageNumber()}
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        className=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    {pageNumbers.map((number) => (
                      <PaginationButton
                        key={number}
                        number={number}
                        isActive={number == currentPage}
                        handleClick={() => handleClick(number)}
                      />
                    ))}
                    <button
                      type="button"
                      className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                      onClick={() => increasePageNumber()}
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        className=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
