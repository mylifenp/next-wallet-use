'use client'
import {useAppKitAccount} from '@reown/appkit/react'
import {FocusEventHandler, useEffect, useState} from "react";
import MyContract from '../contracts/MyContract.json'
import {Web3} from "web3";
import {localnet_url, myContractAddress} from "@/config";

export default function GetValue() {
  const {status, address, isConnected} = useAppKitAccount()
  const web3 = new Web3(localnet_url);
  const myContract = new web3.eth.Contract(MyContract.abi, myContractAddress);
  const [currentValue, setCurrentValue] = useState<string | undefined>();

  useEffect(() => {
    if (status !== 'connected') return;
    myContract.methods.myVariable().call().then((value) => {
      return setCurrentValue(value?.toString());
    });
  }, [status, address, myContract.methods]);

  if (!isConnected) return <div>Not connected</div>

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const {name, value} = event.target;
    console.log("name and value", name, value)
    myContract.methods.setValue(value).send({from: address}).then(() => {
      return myContract.methods.getValue().call()
    }).then((value) => {
      console.log("value", value);
      setCurrentValue(value?.toString())
    })
  }

  return (
    <>
      <div>The address is: {address}</div>
      <p>the value is {currentValue}</p>
      <div>Change value now</div>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onBlur={handleBlur}
             name={'newValue'}/>
    </>
  )
}