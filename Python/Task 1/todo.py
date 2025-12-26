import json
import os

class Task:
    def __init__(self, title, completed=False):
        self.title = title
        self.completed = completed

    def to_dict(self):
        return {"title": self.title, "completed": self.completed}

    @staticmethod
    def from_dict(data):
        return Task(data['title'], data['completed'])

class ToDoList:
    def __init__(self, storage_file='tasks.json'):
        self.storage_file = storage_file
        self.tasks = []
        self.load_tasks()

    def add_task(self, title):
        self.tasks.append(Task(title))
        self.save_tasks()
        print("✅ Task added.")

    def show_tasks(self):
        if not self.tasks:
            print("📭 No tasks found.")
            return

        print("\n📋 To-Do List:")
        for i, task in enumerate(self.tasks, start=1):
            status = "✅" if task.completed else "❌"
            print(f"{i}. [{status}] {task.title}")

    def complete_task(self, task_number):
        if 1 <= task_number <= len(self.tasks):
            self.tasks[task_number - 1].completed = True
            self.save_tasks()
            print("✔️ Task marked as completed.")
        else:
            print("❌ Invalid task number.")

    def delete_task(self, task_number):
        if 1 <= task_number <= len(self.tasks):
            removed = self.tasks.pop(task_number - 1)
            self.save_tasks()
            print(f"🗑️ Deleted task: {removed.title}")
        else:
            print("❌ Invalid task number.")

    def save_tasks(self):
        with open(self.storage_file, 'w') as f:
            json.dump([t.to_dict() for t in self.tasks], f, indent=4)

    def load_tasks(self):
        if os.path.exists(self.storage_file):
            with open(self.storage_file, 'r') as f:
                try:
                    data = json.load(f)
                    self.tasks = [Task.from_dict(item) for item in data]
                except json.JSONDecodeError:
                    print("⚠️ Error loading tasks. File may be corrupted.")
                    self.tasks = []

def main():
    todo = ToDoList()

    while True:
        print("\n====== 📌 TO-DO LIST MENU ======")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Complete Task")
        print("4. Delete Task")
        print("5. Exit")

        choice = input("Enter choice (1-5): ")

        if choice == '1':
            title = input("Enter task title: ").strip()
            if title:
                todo.add_task(title)
            else:
                print("❌ Task title cannot be empty.")
        elif choice == '2':
            todo.show_tasks()
        elif choice == '3':
            try:
                task_num = int(input("Enter task number to complete: "))
                todo.complete_task(task_num)
            except ValueError:
                print("❌ Please enter a valid number.")
        elif choice == '4':
            try:
                task_num = int(input("Enter task number to delete: "))
                todo.delete_task(task_num)
            except ValueError:
                print("❌ Please enter a valid number.")
        elif choice == '5':
            print("👋 Goodbye! Tasks saved.")
            break
        else:
            print("❌ Invalid option. Try again.")

if __name__ == "__main__":
    main()
