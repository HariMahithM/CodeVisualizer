public class Main {
  public static void main(String[] args) {

      int a = 5;
System.out.println("TRACE:a=" + a);
      int b = a++ + ++a;
System.out.println("TRACE:b=" + b);

      System.out.println(b);

  }
}