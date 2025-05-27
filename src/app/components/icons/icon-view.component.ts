import { Component } from '@angular/core';

@Component({
  selector: 'icon-view',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-600 hover:text-gray-800 transition duration-150"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z
           M2.458 12C3.732 7.943 7.522 5
           12 5s8.268 2.943 9.542 7c-1.274
           4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
      />
    </svg>
  `,
})
export class IconViewComponent {}
