import java.io.*;
import java.util.*;

public class StudentManagementSystem {
    private List<Student> students;
    private final String FILE_NAME = "students.csv";

    public StudentManagementSystem() {
        students = new ArrayList<>();
        loadFromFile();
    }

    public void addStudent(Student student) {
        for (Student s : students) {
            if (s.getRollNumber().equals(student.getRollNumber())) {
                System.out.println("❌ Student with this roll number already exists.");
                return;
            }
        }
        students.add(student);
        saveToFile();
        System.out.println("✅ Student added.");
    }

    public void removeStudent(String rollNumber) {
        Iterator<Student> iterator = students.iterator();
        boolean removed = false;

        while (iterator.hasNext()) {
            Student s = iterator.next();
            if (s.getRollNumber().equals(rollNumber)) {
                iterator.remove();
                removed = true;
                break;
            }
        }

        if (removed) {
            saveToFile();
            System.out.println("✅ Student removed.");
        } else {
            System.out.println("❌ Student not found.");
        }
    }

    public void editStudent(String rollNumber, Scanner scanner) {
        for (Student s : students) {
            if (s.getRollNumber().equals(rollNumber)) {
                System.out.print("New name (leave blank to keep: " + s.getName() + "): ");
                String name = scanner.nextLine();
                if (!name.isEmpty()) s.setName(name);

                System.out.print("New grade (leave blank to keep: " + s.getGrade() + "): ");
                String grade = scanner.nextLine();
                if (!grade.isEmpty()) s.setGrade(grade);

                System.out.print("New age (leave blank to keep: " + s.getAge() + "): ");
                String ageInput = scanner.nextLine();
                if (!ageInput.isEmpty()) {
                    try {
                        s.setAge(Integer.parseInt(ageInput));
                    } catch (NumberFormatException e) {
                        System.out.println("⚠️ Invalid age format. Keeping previous age.");
                    }
                }

                saveToFile();
                System.out.println("✅ Student updated.");
                return;
            }
        }
        System.out.println("❌ Student not found.");
    }

    public void searchStudent(String rollNumber) {
        for (Student s : students) {
            if (s.getRollNumber().equals(rollNumber)) {
                System.out.println(s);
                return;
            }
        }
        System.out.println("❌ Student not found.");
    }

    public void displayAllStudents() {
        if (students.isEmpty()) {
            System.out.println("📭 No students available.");
            return;
        }
        for (Student s : students) {
            System.out.println(s);
        }
    }

    private void saveToFile() {
        try (PrintWriter writer = new PrintWriter(new FileWriter(FILE_NAME))) {
            for (Student s : students) {
                writer.println(s.toCSV());
            }
        } catch (IOException e) {
            System.out.println("❌ Error saving data.");
        }
    }

    private void loadFromFile() {
        File file = new File(FILE_NAME);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                students.add(Student.fromCSV(line));
            }
        } catch (IOException e) {
            System.out.println("⚠️ Error loading data.");
        }
    }
}
