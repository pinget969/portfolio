import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { DailyScrumDemo } from './features/daily-scrum-demo/daily-scrum-demo';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Projects, DailyScrumDemo, Experience, Skills, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
