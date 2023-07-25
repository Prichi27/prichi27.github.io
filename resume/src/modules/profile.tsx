import React from 'react'
import profile from "../assets/img/Profile.jpg"
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { FaLinkedin, FaItchIo } from 'react-icons/fa'
import { IProfileItemProps } from '../interface/profile.details.interface';


const ProfileItem = (props: IProfileItemProps) => {
	return (
		<div className='flex w-9/12 space-x-1'>
			<div className='flex justify-center items-center bg-[#1c1d4f] rounded-full w-5 h-5 py-2 px-1'>
				<props.Icon className=' text-white'/>
			</div>
			<span className='break-words'>{props.Details}</span>
		</div>
	)
}

const Profile = () => {
	const ProfileDetails: IProfileItemProps[] = [
		{
			Icon: MdLocationOn,
			Details: "Jalan Kerinchi Kanan, Bangsar South, Kuala Lumpur, Malaysia"
		},
		{
			Icon: MdEmail,
			Details: "priyeshan.sreeneebus@outlook.com"
		},
		{
			Icon: FaLinkedin,
			Details: "linkedin.com/in/priyeshan-sreeneebus"
		}, 
		{
			Icon: FaItchIo,
			Details: "prichi.itch.io"
		}
	]

	return (
		<div className="flex w-full flex-row items-center justify-around space-x-5">
			<div className=" w-64 h-44 border-2 overflow-hidden relative profile-photo rounded-lg shadow-[10px_10px_4px_#948db3]">
				<img className="w-100 h-100 absolute top-negative" src={profile} alt="image of Priyeshan Sreeneebus" />
			</div>

			<div className="flex flex-col contact-details">
				<h1 className="font-header">Priyeshan Sreeneebus</h1>
				{ProfileDetails.map(item => <ProfileItem Icon={item.Icon} Details={item.Details}/>)}
			</div>
		</div>
	)
}

export default Profile