import { Component } from '@angular/core';
import { Navbar } from "../../potforlio/navbar/navbar";
import { Main } from "../../potforlio/main/main";
import { Projects } from "../../potforlio/projects/projects";
import { Boxes } from "../../potforlio/boxes/boxes";
import { Contact } from "../../potforlio/contact/contact";
import {  SkillsComponent } from "../../potforlio/skills/skills";
import { MyJourney } from "../../potforlio/my-journey/my-journey";

@Component({
  selector: 'app-allcom',
  imports: [Navbar, Main, Projects, Boxes, Contact, SkillsComponent, MyJourney],
  templateUrl: './allcom.html',
  styleUrl: './allcom.css',
})
export class Allcom {

}
