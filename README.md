# Sunbird-ED Forms

Contains  Form component powered by angular. This component expects a configuration and renders form according to the view.

<p>
  <img alt="angular" src="https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white" height=25 />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" height=25 />
</p>

---
## Getting started
How to use @project-sunbird/common-form-elements in your projects

## Table of Contents

- [Using library locally](#using-library-locally)
- [Step 1: Install the package](#step-1-install-the-package)
- [Step 2: Include the library selector in view( Eg .HTML file)](#step-2-include-the-library-selector-in-view-eg-html-file)
- [Step 3: Form component emits values on every input , To get value include event callbacks](#step-3-form-component-emits-values-on-every-input--to-get-value-include-event-callbacks)
- [Steps to Integrate the form](#steps-to-integrate-the-form)
- [Versions](#versions)
---

## Using library locally 

1. Build library
```console
npm run build-lib
```
2. link library
   -> cd dist/common-form-elements
```console
npm link
```
3. Link the library to your project
```console
npm link @project-sunbird/common-form-elements
```
---

## Step 1: Install the package

    npm install common-form-elements --save

## Step 2: Include the library selector in view( Eg .HTML file)
   
   <sb-form [config]='config'></sb-form>

## Step 3: Form component emits values on every input , To get value include event callbacks
 
  <sb-form (valueChanges)="function($event)" (statusChanges)="function($event)" ></sb-form>
  
## Steps to Integrate the form

Please refer following link for sample config

https://github.com/Sunbird-Ed/SunbirdEd-forms/blob/release-4.1.0/projects/common-form-elements/src/lib/form/form.component.ts
   
The Form Can render following elements:


* Text Box
* Text Area
* Drop Down (Single)
* Multi Select Drop Down

Drop Down Data Sources:
Drop Down can be provided with multiple types of Data Sources:
* Static List
* Closure which is called as MARKER in above config (A function which returns Promise of FieldConfig)
* API Source - Currently Not Developed (Open For Contribution)



Example of Closure Implementation

```
buildStateListClosure(config: FieldConfig<any>, initial = false): FieldConfigOptionsBuilder<Location> {
    return (formControl: FormControl, _: FormControl, notifyLoading, notifyLoaded) => {
      return defer(async () => {
        const req: LocationSearchCriteria = {
          from: CachedItemRequestSourceFrom.SERVER,
          filters: {
            type: LocationType.TYPE_STATE
          }
        };
        notifyLoading();
        return this.fetchUserLocation(req)
          .then((stateLocationList: Location[]) => {
            notifyLoaded();
            const list = stateLocationList.map((s) => ({ label: s.name, value: s }));
            if (config.default && initial) {
              const option = list.find((o) => o.value.id === config.default.id || o.label === config.default.name);
              formControl.patchValue(option ? option.value : null, { emitModelToViewChange: false });
              formControl.markAsPristine();
              config.default['code'] = option ? option.value['code'] : config.default['code'];
            }
            initial = false;
            return list;
          })
          .catch((e) => {
            notifyLoaded();
            this.commonUtilService.showToast('NO_DATA_FOUND');
            console.error(e);
            return [];
          });
      });
    };
  }
```
 The Logic Inside can be customised to own needs of project.
 
Function Signature should be as follows:

```
functionName(config: FieldConfig<any>, initial = false): FieldConfigOptionsBuilder<T>
```


## Versions
|   Release branch  | npm package version | Angular Version |
|:-----------------:|:-------------------:|:---------------:|
| release-5.0.1     |        5.0.1        |      Ng V9      |
| release-5.1.0_v10 |        5.1.0        |      Ng V10     |
| release-5.1.0_v11 |        5.1.1        |      Ng V11     |
| release-5.1.0_v12 |        5.1.2        |      Ng V12     |
| release-6.0.0_v13 |        6.0.0        |      Ng V13     |
| release-6.0.0_v14 |  6.0.1/6.0.2/6.0.3  |      Ng V14     |
|     8.0.0_v15     |        6.0.4        |      Ng V15     |

