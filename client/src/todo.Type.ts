export default interface todoType {
  todo_id: string,
  description: string,
  owner: string,
  priority: string,
  day: string,
  morning: boolean,
  afternoon: boolean,
  evening: boolean,
  completed: boolean
}