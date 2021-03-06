THIS REPO IS NOT ACTIVELY MAINTAINED and has several incompatibilities with most browsers. I'm happy to test/review/merge pull requests and am open to passing ownership of this project to another.

# AngularPrint
An Angular module that allows users to selectively print elements, as well as provides optimizations for printing. By default, printing margins are minimized.

## Installation

 - Make sure bower is installed;
 - Navigate to the root directory of your project and execute the comand:

 ```bash
 $ bower install angular-print
 ```
 
 - Insert stylesheet and javascript file:
 - 
 ```html
 <!-- CSS -->
 <link media="print" rel="stylesheet" href="public/angularPrint/angularPrint.css">
 
 <!-- JS -->
 <script src="public/angularPrint/angularPrint.js"></script>
 ```
 - Import module to your Angular app using the name "AngularPrint":
 ```javascript
 (function() {
   'use strict';
   
   angular.module('yourApp', ['AngularPrint', '...']);
 })();
 ```

## Using AngularPrint
#### printSection
  - **Directive type:** Attribute
  - **Description**: Makes element and its children visible for printing

  ```html
  <div>
      <div print-section>
        I'll print
        <p>Me, too!</p>
      </div>
      <div>I won't</div>
  </div>
  ```
#### printOnly
  - **Directive type:** Attribute
  - **Description**: Makes element and its children only visible for printing

  ```html
  <div print-section>
      <div print-only>
        I'll print, but until then nobody wants me
        <p>Me, too!</p>
      </div>
      <div>Me, too! Except that people still want to look at me in the meantime...</div>
  </div>
  ```
#### printHide
  - **Directive type:** Attribute
  - **Description**: Makes element invisible during printing, but it is replaced by blank space
  
  ```html
  <div print-section>
      <div print-hide>
        I won't print
        <p>Me, either</p>
      </div>
      <div>I'll print, but those bozos upstairs are still taking up space</div>
  </div>
  ```

#### printRemove
  - **Directive type:** Attribute
  - **Description**: Makes element invisible during printing

  ```html
  <div print-section>
      <div print-remove>
        I won't print
        <p>Me, either</p>
      </div>
      <div>I'll print, and those bozos upstairs will finally stop making such a ruckus</div>
  </div>
  ```
#### printIf
  - **Directive type:** Attribute
  - **Description**: Toggles print-visibility based on expression

  ```html
  <!--Pigs do not yet fly, so this div, despite having print-section, will not print-->
  <div print-section print-if="pigsFly"></div>
  <!--Sam IS the best, so this div will print, despite not having print-section-->
  <div print-if="samIsTheBest"></div>
  ```

#### printBtn
  - **Directive type:** Attribute
  - **Description**: Adds onClick callback to element that will trigger printing

  ```html
  <button print-btn>Doesn't matter where you put me</button>
  <span print-btn>I will make anything cause a print</span>
  <p print-btn>to happen if you click me</p>
  ```
  
#### printLandscape
  - **Directive type:** Attribute
  - **Description**: Will cause printing to be landscape instead of portrait

  ```html
  <button print-landscape>Doesn't matter where you put me</button>
  <span print-landscape>I will cause any print</span>
  <p print-landscape>to be landscape</p>
  ```

#### printAvoidBreak
  - **Directive type:** Attribute
  - **Description**: Prevents page breaks on element

  ```html
  <button print-avoid-break>This element won't get split by page breaks</button>
  ```
  
#### printTable
  - **Directive type:** Attribute
  - **Description**:
    - Optimizes table for printing. This includes keeping 'td' cell content from being cut-off by page breaks.
    - Must be passed an array scope object representing the data presented by the table.
    - Column headers will persist between pages only if the ```<thead>``` and ```<tbody>``` tags are used correctly.

  This example shows adjustments to an already-visible table in order to tailor it for printing

  ```html
  <table print-table="people">
    <thead>
      <tr>
        <td print-remove>Unwanted field</td>
        <td>Name</td>
        <td>Address</td>
        <td>Phone</td>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="person in people">
        <td print-remove>{{person.unwantedInfo}}</td>
        <td>{{person.name}}</td>
        <td>{{person.address}}</td>
        <td>{{person.phone}}</td>
      </tr>
    </tbody>
  </table>      
  ```

  This example shows a table made to only be visible during printing

  ```html
  <table print-table="people" print-only>
    <thead>
      <tr>
        <td>Name</td>
        <td>Address</td>
        <td>Phone</td>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="person in people">
        <td>{{person.name}}</td>
        <td>{{person.address}}</td>
        <td>{{person.phone}}</td>
      </tr>
    </tbody>
  </table>      
  ```
