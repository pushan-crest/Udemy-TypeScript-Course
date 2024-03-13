/// <reference path="./components/project-input.ts"/>
/// <reference path="./components/project-list.ts"/>

// ============= Defining Project Class =================
namespace App {
  // =============== Component base Class =====================

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
