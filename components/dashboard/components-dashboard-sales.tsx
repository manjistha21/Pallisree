import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IconSearch from '@/components/icon/icon-search'; // Assuming you have a search icon component

const ComponentsDashboardSales = () => {
  const [trainees, setTrainees] = useState([]);
  const [clubmembers, setClubmembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await fetch('/api/studentform');
        const data = await response.json();
        setTrainees(data.studentforms || []);
      } catch (error) {
        console.error('Error fetching trainees:', error);
      }
    };

    fetchTrainees();
  }, []);

  useEffect(() => {
    const fetchClubmembers = async () => {
      try {
        const response = await fetch('/api/clubmember');
        const data = await response.json();
        setClubmembers(data.clubmembers || []);
      } catch (error) {
        console.error('Error fetching clubmembers:', error);
      }
    };

    fetchClubmembers();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscription');
        const data = await response.json();
        setSubscriptions(data.subscriptions || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const [search, setSearch] = useState('');

  const filteredClubmembers = clubmembers.filter((clubmember) =>
    clubmember.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.trainee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-5">
        <form className="mx-auto mb-5 w-full sm:w-1/2">
          <div className="relative">
            <input
              type="text"
              value={search}
              placeholder="Search..."
              className="form-input h-11 rounded-full bg-white shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary absolute inset-y-0 m-auto flex h-9 w-9 items-center justify-center rounded-full p-0 ltr:right-1 rtl:left-1"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {/* Clubmembers Table */}
        <div className="panel h-full w-full">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">Clubmembers</h5>
          </div>
          <div className="table-responsive">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Phone No</th>
                  <th className="p-3 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredClubmembers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">No clubmembers data available</td>
                  </tr>
                ) : (
                  filteredClubmembers.map((clubmember, index) => (
                    <tr key={index} className="text-black dark:text-white">
                      <td className="p-3 border-b">
                        <img src={clubmember.image} alt="Profile" className="w-8 h-8 rounded-md object-cover" />
                      </td>
                      <td className="p-3 border-b">{clubmember.name}</td>
                      <td className="p-3 border-b">{clubmember.phoneno}</td>
                      <td className="p-3 border-b">{clubmember.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trainees Table */}
        <div className="panel h-full w-full">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">Trainees</h5>
          </div>
          <div className="table-responsive">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Phone No</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainees.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-3 text-center">No trainees data available</td>
                  </tr>
                ) : (
                  filteredTrainees.map((trainee, index) => (
                    <tr key={index} className="text-black dark:text-white">
                      <td className="p-3 border-b">
                        <img src={trainee.image} alt="Profile" className="w-8 h-8 rounded-md object-cover" />
                      </td>
                      <td className="p-3 border-b">{trainee.name}</td>
                      <td className="p-3 border-b">{trainee.phoneno}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="panel h-full w-full">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">Subscriptions</h5>
          </div>
          <div className="table-responsive">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-3 border-b">Trainee</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-3 text-center">No subscriptions data available</td>
                  </tr>
                ) : (
                  filteredSubscriptions.map((subscription, index) => (
                    <tr key={index} className="text-black dark:text-white">
                      <td className="p-3 border-b">{subscription.trainee}</td>
                      <td className="p-3 border-b">{subscription.date}</td>
                      <td className="p-3 border-b">{subscription.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDashboardSales;
