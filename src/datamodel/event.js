import { reactive } from 'vue'

let nextId = 5

export class Event {
  constructor({ title, description, date, location, focus, capacity, schedule = [] }) {
    this.id = nextId++
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.focus = focus
    this.attendees = 0
    this.capacity = capacity
    this.schedule = schedule
  }
}

export const eventStore = reactive([
  {
    id: 1,
    title: 'Annual Cross Kart Championship',
    description: 'Practice runs, tuning sessions, and a full sprint bracket.',
    date: 'Apr 18', location: 'Tunis Raceway', focus: 'Race Prep',
    attendees: 48, capacity: 80,
    schedule: [
      { time: '08:00 AM', label: 'Gates Open & Registration', icon: 'mdi-door-open' },
      { time: '09:00 AM', label: 'Safety Briefing', icon: 'mdi-shield-check' },
      { time: '10:00 AM', label: 'Practice Laps Begin', icon: 'mdi-flag' },
      { time: '02:00 PM', label: 'Sprint Bracket Races', icon: 'mdi-flag-checkered' },
      { time: '05:00 PM', label: 'Awards Ceremony', icon: 'mdi-trophy' },
    ],
  },
  {
    id: 2,
    title: 'Street Kart Night Race',
    description: 'Late-night laps with lighting checks and track walkthroughs.',
    date: 'Apr 22', location: 'Coastal Circuit', focus: 'Night Setup',
    attendees: 31, capacity: 50,
    schedule: [
      { time: '06:00 PM', label: 'Arrival & Lighting Check', icon: 'mdi-lightbulb' },
      { time: '07:30 PM', label: 'Track Walkthrough', icon: 'mdi-walk' },
      { time: '08:30 PM', label: 'Night Laps Begin', icon: 'mdi-weather-night' },
      { time: '11:00 PM', label: 'Final Lap & Wrap-up', icon: 'mdi-flag-checkered' },
    ],
  },
  {
    id: 3,
    title: 'Junior Race Day',
    description: 'Coaching, safety checks, and beginner-friendly timed runs.',
    date: 'Apr 27', location: 'Karthub Arena', focus: 'Junior Coaching',
    attendees: 26, capacity: 40,
    schedule: [
      { time: '09:00 AM', label: 'Registration & Kart Check', icon: 'mdi-clipboard-check' },
      { time: '10:00 AM', label: 'Coaching Session', icon: 'mdi-account-tie' },
      { time: '11:30 AM', label: 'Timed Practice Runs', icon: 'mdi-timer' },
      { time: '02:00 PM', label: 'Junior Race Finals', icon: 'mdi-flag-checkered' },
    ],
  },
  {
    id: 4,
    title: 'Pro Kart Invitational',
    description: 'Fast laps, spec checks, and a shared setup review session.',
    date: 'May 2', location: 'Desert Loop', focus: 'High Performance',
    attendees: 57, capacity: 70,
    schedule: [
      { time: '07:30 AM', label: 'Spec & Tech Inspection', icon: 'mdi-wrench' },
      { time: '09:00 AM', label: 'Qualifying Laps', icon: 'mdi-speedometer' },
      { time: '12:00 PM', label: 'Setup Review Session', icon: 'mdi-cog' },
      { time: '02:30 PM', label: 'Invitational Race', icon: 'mdi-flag-checkered' },
      { time: '05:00 PM', label: 'Podium & Debrief', icon: 'mdi-trophy-variant' },
    ],
  },
])

export function getAllEvents() {
  return eventStore
}

export function addEvent(event) {
  eventStore.push(event)
}

export function updateEventById(id, data) {
  const idx = eventStore.findIndex(e => e.id === id)
  if (idx !== -1) Object.assign(eventStore[idx], data)
}

export function deleteEventById(id) {
  const idx = eventStore.findIndex(e => e.id === id)
  if (idx !== -1) eventStore.splice(idx, 1)
}