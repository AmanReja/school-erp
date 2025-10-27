import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const MerchantDetails = () => {
  const { merchantId } = useParams();
  const dispatch = useDispatch();
  const merchantDetails = useSelector((state) => state.merchants.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (merchantId) {
      dispatch(getDetails(merchantId)).finally(() => {
        setLoading(false);
      });
    }
  }, [merchantId, dispatch]);

  if (loading) {
    return <p className="text-center p-6">Loading...</p>;
  }

  if (!merchantDetails) {
    return <p className="text-center text-red-500 p-6">No details found</p>;
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Merchant Details</h2>

      <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-2 gap-x-8 gap-y-3">
        <p><span className="font-bold">Name:</span> {merchantDetails.name}</p>
        <p><span className="font-bold">Corp ID:</span> {merchantDetails.corp_id}</p>
        <p><span className="font-bold">Email:</span> {merchantDetails.email}</p>
        <p><span className="font-bold">Phone:</span> {merchantDetails.phone}</p>
        <p><span className="font-bold">GST:</span> {merchantDetails.gstno}</p>
        <p><span className="font-bold">Account No:</span> {merchantDetails.accountNumber}</p>
      </div>
    </div>
  );
};

export default MerchantDetails;
