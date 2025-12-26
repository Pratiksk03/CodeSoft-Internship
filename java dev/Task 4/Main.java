import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        StudentManagementSystem sms = new StudentManagementSystem();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n===== 🎓 Student Management System =====");
            System.out.println("1. Add Student");
            System.out.println("2. Edit Student");
            System.out.println("3. Remove Student");
            System.out.println("4. Search Student");
            System.out.println("5. Display All Students");
            System.out.println("6. Exit");
            System.out.print("Enter your choice (1-6): ");

            String choice = scanner.nextLine();

            switch (choice) {
                case "1":
                    System.out.print("Enter name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter roll number: ");
                    String roll = scanner.nextLine();
                    System.out.print("Enter grade: ");
                    String grade = scanner.nextLine();
                    System.out.print("Enter age: ");
                    String ageStr = scanner.nextLine();

                    if (name.isEmpty() || roll.isEmpty() || grade.isEmpty() || ageStr.isEmpty()) {
                        System.out.println("❌ All fields are required.");
                        break;
                    }

                    try {
                        int age = Integer.parseInt(ageStr);
                        sms.addStudent(new Student(name, roll, grade, age));
                    } catch (NumberFormatException e) {
                        System.out.println("❌ Invalid age input.");
                    }
                    break;

                case "2":
                    System.out.print("Enter roll number to edit: ");
                    sms.editStudent(scanner.nextLine(), scanner);
                    break;

                case "3":
                    System.out.print("Enter roll number to remove: ");
                    sms.removeStudent(scanner.nextLine());
                    break;

                case "4":
                    System.out.print("Enter roll number to search: ");
                    sms.searchStudent(scanner.nextLine());
                    break;

                case "5":
                    sms.displayAllStudents();
                    break;

                case "6":
                    System.out.println("👋 Goodbye!");
                    return;

                default:
                    System.out.println("❌ Invalid choice. Try again.");
            }
        }
    }
}
