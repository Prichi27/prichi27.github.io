import React from 'react'
import { IEducationItem } from '../interface/skills.interface'

const EducationItems: Array<IEducationItem> = [

]

const Educations = (props: IEducationItem) => {
	return (
		<div className="flex flex-col">
			<span>{props.InstitutionName}</span>
			<span>{props.Year}</span>
			<span>{props.Degree}</span>
		</div>
	)
}

const Skills = () => {
	return (
		<div className="flex w-full flex-row basis-0 justify-around">

			<div className="education basis-0">
				<h2 className="font-header">Education</h2>
				{EducationItems.map((element, key) => <Educations InstitutionName={element.InstitutionName} Year={element.Year} Degree={element.Degree} key={key}/>)}
			</div>

			<div className="border-separator-right"></div>

			<div className="certificate basis-0">
				<h2 className="font-header">Certificate</h2>
				<div className="flex flex-col">
					<span>Unity Certified User: Programmer</span>
				</div>
			</div>

			<div className="border-separator-right"></div>

			<div className="skills basis-0">
				<h2 className="font-header">Skills</h2>
				<ul>
					<li>C++</li>
					<li>C#</li>
					<li>Unity</li>
					<li>Unreal</li>
					<li>Fullstack Web Development</li>
					<li>Project Planning</li>
					<li>Team Management</li>
					<li>Client Management</li>
				</ul>

			</div>
		</div>

	)
}

export default Skills