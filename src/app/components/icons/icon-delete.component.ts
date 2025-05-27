import { Component } from '@angular/core';

@Component({
  selector: 'icon-delete',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-red-600 hover:text-red-700 transition duration-150"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  `,
})
export class IconDeleteComponent {}
