# SunbirdEdForms

This library contains form component powered by Angular. This component expects a configuration and renders form according to the view. It offers the flexibility to render wide variety of form elements like text area, textbox, dropdown, etc based on the configuration passed to the component.

# Getting Started

## Step 1: Install the package

    npm install common-form-elements --save

## Step 2: Include the library selector in view( Eg .HTML file)
   
   <sb-form [config]='config'></sb-form>

## step3: Form component emits values on every input , To get value include event callbacks
 
  <sb-form (valueChanges)="function($event)" (statusChanges)="function($event)" ></sb-form>
   

    
 
