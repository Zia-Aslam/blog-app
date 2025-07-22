import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];
    profileItems!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.updateProfileItems();

        // Subscribe to auth changes to update profile items
        this.authService.currentUser$.subscribe(() => {
            this.updateProfileItems();
        });
    }

    get currentUser() {
        return this.authService.currentUserValue;
    }

    get isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    getUserDisplayName(): string {
        if (!this.currentUser) return '';

        const { firstName, lastName, username } = this.currentUser;
        if (firstName || lastName) {
            return `${firstName || ''} ${lastName || ''}`.trim();
        }
        return username || '';
    }

    getUserInitials(): string {
        if (!this.currentUser) return 'U';

        const { firstName, lastName, username } = this.currentUser;
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        } else if (firstName) {
            return firstName.charAt(0).toUpperCase();
        } else if (lastName) {
            return lastName.charAt(0).toUpperCase();
        }
        return username?.charAt(0).toUpperCase() || 'U';
    }

    updateProfileItems() {
        if (this.isAuthenticated) {
            this.profileItems = [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        // Navigate to profile page when implemented
                        console.log('Navigate to profile');
                    },
                },
                {
                    label: 'My Posts',
                    icon: 'pi pi-file-edit',
                    command: () => {
                        // Navigate to user's posts when implemented
                        console.log('Navigate to my posts');
                    },
                },
                {
                    separator: true,
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logout();
                    },
                },
            ];
        } else {
            this.profileItems = [];
        }
    }

    login() {
        this.router.navigate(['/auth/login']);
    }

    register() {
        this.router.navigate(['/auth/register']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }

    createPost() {
        this.router.navigate(['/blog/create']);
    }
}
