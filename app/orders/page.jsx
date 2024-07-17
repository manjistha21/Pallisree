"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";



const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
  
      return res.json();
    } catch (error) {
      console.error("Error fetching order:", error);
      return { orders: [] };
    }
  };
export default function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
          const { orders } = await getOrders();
          setOrders(orders);
        };
    
        fetchOrders();
      }, []);

    return (
        <>
          <div>
            <Link href="/addorder">
              <button className="btn btn-primary">ADD ORDER</button>
            </Link>
          </div>
    
          <table className="table">
            <thead>
              <tr>
                
                <th>Tags</th>
                <th>Customer</th>
                <th>Reason For Transfer</th>
                <th>Foreign Currency</th>
                <th>Country</th>
                <th>Source of Funds</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((rs) => (
                <tr className="hover" key={rs._id}>
                  
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12"></div>
                      </div>
                      
                    </div>
                  </td>
                  <td>{rs.tags}</td>
                  <td>{rs.customer}</td>
                  <td>{rs.reasonfortransfer}</td>
                  <td>{rs.foreigncurrency}</td>
                  <td>{rs.country}</td>
                  <td>{rs.sourceoffunds}</td>
                  <td>
                    <Link href={`/editorder/${rs._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }