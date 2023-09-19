import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tabs-automatic',
  templateUrl: './tabs-automatic.component.html',
  styleUrls: ['./tabs-automatic.component.css']
})
export class TabsAutomaticComponent implements OnInit {
  tabs: Element[]; // Assuming you have an array of tab elements
  tabpanels: Element[]; // Assuming you have an array of tabpanel elements
  firstTab: Element; // Assuming you have a reference to the first tab
  lastTab: Element; // Assuming you have a reference to the last tab

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeTabs();
  }

  initializeTabs() {
    // Initialize your tabs and tabpanels here

    // Add event listeners
    this.tabs.forEach(tab => {
      tab.addEventListener('click', this.onClick.bind(this));
      tab.addEventListener('keydown', this.onKeydown.bind(this));
    });
  }

  setSelectedTab(currentTab: Element) {
    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i];
      if (currentTab === tab) {
        this.renderer.setAttribute(tab, 'aria-selected', 'true');
        this.renderer.removeAttribute(tab, 'tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
        tab.focus();
      } else {
        this.renderer.setAttribute(tab, 'aria-selected', 'false');
        this.renderer.setAttribute(tab, 'tabindex', '-1');
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  setSelectedToPreviousTab(currentTab: Element) {
    let index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab: Element) {
    let index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const tgt = event.currentTarget as Element;
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event: Event) {
    const currentTarget = event.currentTarget as Element;
    this.setSelectedTab(currentTarget);
  }
}
