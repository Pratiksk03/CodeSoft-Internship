#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Task {
    string description;
    bool completed = false;
};

void addTask(vector<Task>& tasks) {
    cout << "Enter task description: ";
    string desc;
    cin.ignore(); // To clear the input buffer before getline
    getline(cin, desc);

    tasks.push_back({desc, false});
    cout << "Task added successfully.\n";
}

void viewTasks(const vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "No tasks in the list.\n";
        return;
    }

    cout << "\n--- To-Do List ---\n";
    for (size_t i = 0; i < tasks.size(); i++) {
        cout << i + 1 << ". [" << (tasks[i].completed ? 'X' : ' ') << "] " << tasks[i].description << "\n";
    }
    cout << "------------------\n";
}

void markTaskCompleted(vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "No tasks to mark as completed.\n";
        return;
    }

    int index;
    cout << "Enter task number to mark as completed: ";
    cin >> index;

    if (index > 0 && index <= (int)tasks.size()) {
        tasks[index - 1].completed = true;
        cout << "Task marked as completed.\n";
    } else {
        cout << "Invalid task number.\n";
    }
}

void removeTask(vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "No tasks to remove.\n";
        return;
    }

    int index;
    cout << "Enter task number to remove: ";
    cin >> index;

    if (index > 0 && index <= (int)tasks.size()) {
        tasks.erase(tasks.begin() + (index - 1));
        cout << "Task removed.\n";
    } else {
        cout << "Invalid task number.\n";
    }
}

int main() {
    vector<Task> tasks;
    int choice;

    do {
        cout << "\n--- To-Do List Menu ---\n";
        cout << "1. Add Task\n";
        cout << "2. View Tasks\n";
        cout << "3. Mark Task as Completed\n";
        cout << "4. Remove Task\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1: addTask(tasks); break;
            case 2: viewTasks(tasks); break;
            case 3: markTaskCompleted(tasks); break;
            case 4: removeTask(tasks); break;
            case 5: cout << "Exiting the program. Goodbye!\n"; break;
            default: cout << "Invalid choice, please try again.\n";
        }
    } while (choice != 5);

    return 0;
}
