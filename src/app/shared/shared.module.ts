import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MatNativeDateModule } from '@angular/material/core';
import { UserComponent } from './components/user/user.component';
import { InitialsPipe } from './pipes/initials.pipe';
export function playerFactory() {
    return player;
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        MatDividerModule,
        [LottieModule.forRoot({ player: playerFactory })],
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatIconModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        MatDividerModule,
        LottieModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        UserComponent, InitialsPipe,
        MatSlideToggleModule,
        MatMenuModule,
        MatIconModule

    ],
    declarations: [
        EmptyStateComponent,
        UserComponent,
        InitialsPipe
    ]
})
export class SharedModule {
}
