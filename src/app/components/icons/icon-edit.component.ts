import { Component } from '@angular/core';

@Component({
  selector: 'icon-edit',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-blue-600 hover:text-blue-800 transition duration-150"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5l10.036-10.036a1.5 1.5 0 00-2.122-2.122L4 13.5z"
      />
    </svg>
  `,
})
export class IconEditComponent {}
