import { Component } from '@angular/core';
import { Navbar } from "../../potforlio/navbar/navbar";
import { Main } from "../../potforlio/main/main";
import { Boxes } from "../../potforlio/boxes/boxes";
import { Contact } from "../../potforlio/contact/contact";
import {  SkillsComponent } from "../../potforlio/skills/skills";
import { MyJourney } from "../../potforlio/my-journey/my-journey";
import { ProjectsComponent } from "../../potforlio/projects/projects";
import { MyExperties } from "../../potforlio/my-experties/my-experties";
import { Footer } from "../../potforlio/footer/footer";

@Component({
  selector: 'app-allcom',
  imports: [Navbar, Main, Boxes, Contact, SkillsComponent, MyJourney, ProjectsComponent, MyExperties, Footer],
  templateUrl: './allcom.html',
  styleUrl: './allcom.css',
})
export class Allcom {

}
