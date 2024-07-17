"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ComponentsDashboardSales = () => {
  const [trainees, setTrainees] = useState([]);
  const [clubmembers, setClubmembers] = useState([]);
  const [subscriptions, setSubscription] = useState([]);

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await fetch("/api/studentform");
        const data = await response.json();
        console.log("Trainees data:", data);
        setTrainees(data.studentforms || []);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchTrainees();
  }, []);

  useEffect(() => {
    const fetchClubmembers = async () => {
      try {
        const response = await fetch("/api/clubmember");
        const data = await response.json();
        console.log("Clubmember data:", data);
        setClubmembers(data.clubmembers || []);
      } catch (error) {
        console.error("Error fetching clubmembers:", error);
      }
    };

    fetchClubmembers();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/subscription");
        const data = await response.json();
        console.log("Subscriptions data:", data);
        setSubscription(data.subscriptions || []); // Ensure the correct property is accessed
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Sales</span>
          </li>
        </ul>

        <div className="pt-5">
          <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"></div>
          <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"></div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="panel h-full w-full">
              <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                  Clubmembers
                </h5>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Gender</th>
                      <th>DOB</th>
                      <th>Blood Group</th>
                      <th>Phone No</th>
                      <th>Email</th>
                      <th>Inducer Name</th>
                      <th>Inducer Address</th>
                      <th>Joining Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubmembers.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No clubmembers data available
                        </td>
                      </tr>
                    ) : (
                      clubmembers.map((clubmember, index) => (
                        <tr
                          key={index}
                          className="group text-white-dark hover:text-black dark:hover:text-white-light/90"
                        >
                          <td className="text-black dark:text-white">
                            {clubmember.name}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.address}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.gender}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.dob}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.bloodgroup}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.phoneno}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.email}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.inducername}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.induceraddress}
                          </td>
                          <td className="text-black dark:text-white">
                            {clubmember.joiningdate}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel h-full w-full">
              <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                  Trainees
                </h5>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="ltr:rounded-l-md rtl:rounded-r-md">
                        Image
                      </th>
                      <th>Name</th>
                      <th>Father's Name</th>
                      <th>Guardian's Name</th>
                      <th>Guardian's Occupation</th>
                      <th>Address</th>
                      <th>Phone No</th>
                      <th>Date</th>
                      <th>Name of the School</th>
                      <th>Blood Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainees.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No trainees data available
                        </td>
                      </tr>
                    ) : (
                      trainees.map((trainee, index) => (
                        <tr
                          key={index}
                          className="group text-white-dark hover:text-black dark:hover:text-white-light/90"
                        >
                          <td className="text-black dark:text-white">
                            {trainee.image}
                          </td>

                          <td className="text-black dark:text-white">
                            {trainee.name}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.fathersname}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.guardiansname}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.guardiansoccupation}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.address}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.phoneno}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.date}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.nameoftheschool}
                          </td>
                          <td className="text-black dark:text-white">
                            {trainee.bloodgroup}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel h-full w-full">
              <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                  Subscriptions
                </h5>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="ltr:rounded-l-md rtl:rounded-r-md">
                        Trainee
                      </th>
                      <th>Year</th>
                      <th>Date</th>
                      <th>Months Selected</th>
                      <th>Subscription Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No subscriptions data available
                        </td>
                      </tr>
                    ) : (
                      subscriptions.map((subscription, index) => (
                        <tr
                          key={index}
                          className="group text-white-dark hover:text-black dark:hover:text-white-light/90"
                        >
                          <td className="text-black dark:text-white">
                            {subscription.trainee}
                          </td>
                          <td className="text-black dark:text-white">
                            {subscription.year}
                          </td>
                          <td className="text-black dark:text-white">
                            {subscription.date}
                          </td>
                          <td className="text-black dark:text-white">
                            {subscription.monthsSelected.join(", ")}
                          </td>
                          <td className="text-black dark:text-white">
                            {subscription.subscriptionType}
                          </td>
                          <td className="text-black dark:text-white">
                            {subscription.amount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentsDashboardSales;
