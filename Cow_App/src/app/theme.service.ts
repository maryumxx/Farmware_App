import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = false;

  constructor() {
    // Retrieve user preference from localStorage
    const userPreference = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // If the user has not manually set a preference, use system preference
    if (userPreference === null) {
      this.initializeDarkTheme(prefersDark.matches);
    } else {
      this.initializeDarkTheme(userPreference === 'dark');
    }

    // Listen for changes to the system's dark mode preference
    prefersDark.addEventListener('change', (mediaQuery) => {
      if (localStorage.getItem('theme') === null) {
        // Update the theme based on system preference if no manual override exists
        this.initializeDarkTheme(mediaQuery.matches);
      }
    });
  }

  // Initialize dark theme based on user or system setting
  private initializeDarkTheme(isDark: boolean) {
    this.isDarkTheme = isDark;
    this.applyTheme(isDark);
  }

  // Apply the theme
  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
    const titleBars = document.querySelectorAll(".title_bar");
    const green_text = document.querySelectorAll(".green_text");
    const cow_title = document.querySelectorAll(".cow_title");
    const questionnaries_and_medical_rec = document.querySelectorAll(".questionnaries_and_medical_rec");
    const questions_list = document.querySelectorAll(".questions_list");
    const main_cancel_and_add_btn = document.querySelectorAll(".main_cancel_and_add_btn");
    const main_login_container = document.querySelectorAll(".main_login_container");
    const key_event_detail = document.querySelectorAll(".key_event_detail");
    const pro_icons = document.querySelectorAll(".pro_icon");
    const main_cow_image = document.querySelectorAll(".main_cow_image");
    const image_preview = document.querySelectorAll(".image_preview");
    const recommendations = document.querySelectorAll(".recommendations");
    const profile_image = document.getElementById("profile_image") as HTMLImageElement;

    pro_icons.forEach((icon) => {
      icon.classList.toggle("icon_dark_mode", isDark);
    });
    recommendations.forEach((recommendations) => {
      recommendations.classList.toggle("recommendations_dark", isDark);
    });
    questions_list.forEach((questions_list) => {
      questions_list.classList.toggle("questions_list_dark", isDark);
    });
    key_event_detail.forEach((key_event_detail) => {
      key_event_detail.classList.toggle("key_event_detail_dark", isDark);
    });
    main_cancel_and_add_btn.forEach((main_cancel_and_add_btn) => {
      main_cancel_and_add_btn.classList.toggle("dark_btns", isDark);
    });
    main_login_container.forEach((main_login_container) => {
      main_login_container.classList.toggle("main_dark_container", isDark);
    });

    image_preview.forEach((image_preview) => {
      image_preview.classList.toggle("icon_dark_mode", isDark);
    });

    main_cow_image.forEach((icon) => {
      icon.classList.toggle("cow_icon_dark_mode", isDark);
    });

    titleBars.forEach((titleBar) => {
      titleBar.classList.toggle("title_bar_dark", isDark);
    });

    green_text.forEach((green_text) => {
      green_text.classList.toggle("dark_text", isDark);
    });

    cow_title.forEach((cow_title) => {
      cow_title.classList.toggle("gray_text", isDark);
    });

    questionnaries_and_medical_rec.forEach((questionnaries_and_medical_rec) => {
      questionnaries_and_medical_rec.classList.toggle("main_setting_options_dark", isDark);
    });

    if (profile_image) {
      profile_image.src = isDark ? "../../assets/images/user_white.png" : "../../assets/images/user.png";
    }
  }

  // Toggle theme based on user action
  public toggleTheme(isDark: boolean) {
    this.isDarkTheme = isDark;
    this.applyTheme(isDark);
    // Save the user's theme preference in localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Check if the current theme is dark
  public isDark() {
    return this.isDarkTheme;
  }
}