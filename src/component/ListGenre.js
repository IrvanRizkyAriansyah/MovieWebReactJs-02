import React from 'react';
import '../App.css'
import { useEffect } from "react";
// import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../features/movies/genresSlice'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
// import { FreeMode, Pagination } from "swiper";

export default function ListGenre() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {genre, loading} = useSelector ((state) => state.genres)
  const [selected, setSelected] = useState('All genres')

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  
  if (loading) return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>

	return (
		<Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-1 max-w-7xl">
            <Listbox.Button className="relative w-32 text-white rounded-md border bg-transparent py-2 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm cursor-pointer">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name || selected}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-44 w-32 overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {genre.map((genre) => (
                  <Listbox.Option
                    key={genre.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-red-500' : 'text-white',
                        'relative cursor-default select-none py-2'
                      )
                    }
                    value={genre}
                    onClick={() => navigate(`/genre/${genre.name}`)}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {genre.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
	)
}
