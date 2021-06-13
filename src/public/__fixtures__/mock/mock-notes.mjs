import {
  today,
  yesterday,
  dayBeforeYesterday,
  threeDaysAgo,
  fourDaysAgo,
} from './mock-dates'

export const notes = [
  {
    id: 1,
    title: 'CAS FEE Self Study / Complete Project Tasks',
    description: 'Create HTML for the Note App\nCreate CSS for the Note App',
    importance: 5,
    dueDate: new Date('2021-05-20'),
    completionDate: new Date('2021-05-22'),
    dateCreated: today,
    done: true,
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    description: '500g Butter\n 1 doz. Egg',
    importance: 2,
    dueDate: yesterday,
    completionDate: yesterday,
    dateCreated: yesterday,
    done: true,
  },
  {
    id: 3,
    title: 'Call Mom',
    description: '079 123 45 67',
    importance: 3,
    dueDate: dayBeforeYesterday,
    completionDate: dayBeforeYesterday,
    dateCreated: dayBeforeYesterday,
    done: false,
  },
  {
    id: 4,
    title: 'title 4',
    description: 'description 4',
    importance: 4,
    dueDate: threeDaysAgo,
    completionDate: threeDaysAgo,
    dateCreated: threeDaysAgo,
    done: false,
  },
  {
    id: 5,
    title: 'title 5',
    description: 'description 5',
    importance: 5,
    dueDate: fourDaysAgo,
    completionDate: fourDaysAgo,
    dateCreated: fourDaysAgo,
    done: false,
  },
]
