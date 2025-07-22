// Import PrimeNG modules
    import { AutoFocusModule } from 'primeng/autofocus';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { NgModule } from '@angular/core';
    import { OverlayBadgeModule } from 'primeng/overlaybadge';
    import { TabsModule } from 'primeng/tabs';
    import { AvatarModule } from 'primeng/avatar';
    import { AvatarGroupModule } from 'primeng/avatargroup';
    import { AnimateOnScrollModule } from 'primeng/animateonscroll';
    import { AccordionModule } from 'primeng/accordion';
    import { AutoCompleteModule } from 'primeng/autocomplete';
    import { BadgeModule } from 'primeng/badge';
    import { BreadcrumbModule } from 'primeng/breadcrumb';
    import { BlockUIModule } from 'primeng/blockui';
    import { ButtonModule } from 'primeng/button';
    import { CalendarModule } from 'primeng/calendar';
    import { DatePickerModule } from 'primeng/datepicker';
    import { CarouselModule } from 'primeng/carousel';
    import { CascadeSelectModule } from 'primeng/cascadeselect';
    import { ChartModule } from 'primeng/chart';
    import { CheckboxModule } from 'primeng/checkbox';
    import { ChipModule } from 'primeng/chip';
    import { ColorPickerModule } from 'primeng/colorpicker';
    import { ConfirmDialogModule } from 'primeng/confirmdialog';
    import { ConfirmPopupModule } from 'primeng/confirmpopup';
    import { ContextMenuModule } from 'primeng/contextmenu';
    import { DataViewModule } from 'primeng/dataview';
    import { DialogModule } from 'primeng/dialog';
    import { DividerModule } from 'primeng/divider';
    import { DeferModule } from 'primeng/defer';
    import { DockModule } from 'primeng/dock';
    import { DragDropModule } from 'primeng/dragdrop';
    import { SelectModule } from 'primeng/select';
    import { DynamicDialogModule } from 'primeng/dynamicdialog';
    import { EditorModule } from 'primeng/editor';
    import { FieldsetModule } from 'primeng/fieldset';
    import { FileUploadModule } from 'primeng/fileupload';
    import { FocusTrapModule } from 'primeng/focustrap';
    import { GalleriaModule } from 'primeng/galleria';
    import { IftaLabelModule } from 'primeng/iftalabel';
    import { InplaceModule } from 'primeng/inplace';
    import { InputMaskModule } from 'primeng/inputmask';
    import { InputSwitchModule } from 'primeng/inputswitch';
    import { InputTextModule } from 'primeng/inputtext';
    import { TextareaModule } from 'primeng/textarea';
    import { InputNumberModule } from 'primeng/inputnumber';
    import { InputGroupModule } from 'primeng/inputgroup';
    import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
    import { InputOtpModule } from 'primeng/inputotp';
    import { ImageModule } from 'primeng/image';
    import { ImageCompareModule } from 'primeng/imagecompare';
    import { KnobModule } from 'primeng/knob';
    import { ListboxModule } from 'primeng/listbox';
    import { MegaMenuModule } from 'primeng/megamenu';
    import { MenuModule } from 'primeng/menu';
    import { MenubarModule } from 'primeng/menubar';
    import { MessageModule } from 'primeng/message';
    import { MessagesModule } from 'primeng/messages';
    import { MultiSelectModule } from 'primeng/multiselect';
    import { MeterGroupModule } from 'primeng/metergroup';
    import { OrganizationChartModule } from 'primeng/organizationchart';
    import { OrderListModule } from 'primeng/orderlist';
    import { OverlayPanelModule } from 'primeng/overlaypanel';
    import { PaginatorModule } from 'primeng/paginator';
    import { PanelModule } from 'primeng/panel';
    import { PanelMenuModule } from 'primeng/panelmenu';
    import { PasswordModule } from 'primeng/password';
    import { PickListModule } from 'primeng/picklist';
    import { ProgressSpinnerModule } from 'primeng/progressspinner';
    import { ProgressBarModule } from 'primeng/progressbar';
    import { RadioButtonModule } from 'primeng/radiobutton';
    import { RatingModule } from 'primeng/rating';
    import { SelectButtonModule } from 'primeng/selectbutton';
    import { SidebarModule } from 'primeng/sidebar';
    import { ScrollerModule } from 'primeng/scroller';
    import { ScrollPanelModule } from 'primeng/scrollpanel';
    import { ScrollTopModule } from 'primeng/scrolltop';
    import { SkeletonModule } from 'primeng/skeleton';
    import { SliderModule } from 'primeng/slider';
    import { SpeedDialModule } from 'primeng/speeddial';
    import { SplitterModule } from 'primeng/splitter';
    import { StepperModule } from 'primeng/stepper';
    import { SplitButtonModule } from 'primeng/splitbutton';
    import { StepsModule } from 'primeng/steps';
    import { TableModule } from 'primeng/table';
    import { TabMenuModule } from 'primeng/tabmenu';
    import { TagModule } from 'primeng/tag';
    import { TerminalModule } from 'primeng/terminal';
    import { TieredMenuModule } from 'primeng/tieredmenu';
    import { TimelineModule } from 'primeng/timeline';
    import { ToastModule } from 'primeng/toast';
    import { ToggleButtonModule } from 'primeng/togglebutton';
    import { ToggleSwitchModule } from 'primeng/toggleswitch';
    import { ToolbarModule } from 'primeng/toolbar';
    import { TooltipModule } from 'primeng/tooltip';
    import { TreeModule } from 'primeng/tree';
    import { TreeSelectModule } from 'primeng/treeselect';
    import { TreeTableModule } from 'primeng/treetable';
    import { CardModule } from 'primeng/card';
    import { RippleModule } from 'primeng/ripple';
    import { StyleClassModule } from 'primeng/styleclass';
    import { FloatLabelModule } from 'primeng/floatlabel';
    import { IconFieldModule } from 'primeng/iconfield';
    import { InputIconModule } from 'primeng/inputicon';
    import { DrawerModule } from 'primeng/drawer';
    import { PopoverModule } from 'primeng/popover';

    @NgModule({
        imports: [
          PopoverModule,
            AvatarModule,
            AvatarGroupModule,
            AnimateOnScrollModule,
            TabsModule,
            FormsModule,
            ReactiveFormsModule,
            AccordionModule,
            AutoCompleteModule,
            BadgeModule,
            BreadcrumbModule,
            BlockUIModule,
            ButtonModule,
            CalendarModule,
            DatePickerModule,
            CarouselModule,
            CascadeSelectModule,
            ChartModule,
            CheckboxModule,
            ChipModule,
            ColorPickerModule,
            ConfirmDialogModule,
            ConfirmPopupModule,
            ContextMenuModule,
            DataViewModule,
            DialogModule,
            DividerModule,
            DrawerModule,
            DeferModule,
            DockModule,
            DragDropModule,
            SelectModule,
            DynamicDialogModule,
            EditorModule,
            FieldsetModule,
            FileUploadModule,
            FocusTrapModule,
            GalleriaModule,
            IftaLabelModule,
            InplaceModule,
            InputMaskModule,
            InputSwitchModule,
            InputTextModule,
            TextareaModule,
            InputNumberModule,
            InputGroupModule,
            InputGroupAddonModule,
            InputOtpModule,
            ImageModule,
            ImageCompareModule,
            KnobModule,
            ListboxModule,
            MegaMenuModule,
            MenuModule,
            MenubarModule,
            MessageModule,
            MessagesModule,
            MultiSelectModule,
            MeterGroupModule,
            OrganizationChartModule,
            OrderListModule,
            OverlayPanelModule,
            PaginatorModule,
            PanelModule,
            PanelMenuModule,
            PasswordModule,
            PickListModule,
            ProgressSpinnerModule,
            ProgressBarModule,
            RadioButtonModule,
            RatingModule,
            SelectButtonModule,
            SidebarModule,
            ScrollerModule,
            ScrollPanelModule,
            ScrollTopModule,
            SkeletonModule,
            SliderModule,
            SpeedDialModule,
            SplitterModule,
            StepperModule,
            SplitButtonModule,
            StepsModule,
            TableModule,
            TabMenuModule,
            TagModule,
            TerminalModule,
            TieredMenuModule,
            TimelineModule,
            ToastModule,
            ToggleButtonModule,
            ToggleSwitchModule,
            ToolbarModule,
            TreeModule,
            TreeSelectModule,
            TreeTableModule,
            CardModule,
            RippleModule,
            StyleClassModule,
            FloatLabelModule,
            IconFieldModule,
            InputIconModule,
            AutoFocusModule,
            OverlayBadgeModule,
            
        ],
          exports: [
            PopoverModule,
            TabsModule,
            AvatarModule,
            AvatarGroupModule,
            AnimateOnScrollModule,
            FormsModule,
            ReactiveFormsModule,
            AccordionModule,
            AutoCompleteModule,
            BadgeModule,
            BreadcrumbModule,
            BlockUIModule,
            ButtonModule,
            CalendarModule,
            DatePickerModule,
            CarouselModule,
            CascadeSelectModule,
            ChartModule,
            CheckboxModule,
            ChipModule,
            ColorPickerModule,
            ConfirmDialogModule,
            ConfirmPopupModule,
            ContextMenuModule,
            DataViewModule,
            DialogModule,
            DividerModule,
            DrawerModule,
            DeferModule,
            DockModule,
            DragDropModule,
            SelectModule,
            DynamicDialogModule,
            EditorModule,
            FieldsetModule,
            FileUploadModule,
            FocusTrapModule,
            GalleriaModule,
            IftaLabelModule,
            InplaceModule,
            InputMaskModule,
            InputSwitchModule,
            InputTextModule,
            TextareaModule,
            InputNumberModule,
            InputGroupModule,
            InputGroupAddonModule,
            InputOtpModule,
            ImageModule,
            ImageCompareModule,
            KnobModule,
            ListboxModule,
            MegaMenuModule,
            MenuModule,
            MenubarModule,
            MessageModule,
            MessagesModule,
            MultiSelectModule,
            MeterGroupModule,
            OrganizationChartModule,
            OrderListModule,
            OverlayPanelModule,
            PaginatorModule,
            PanelModule,
            PanelMenuModule,
            PasswordModule,
            PickListModule,
            ProgressSpinnerModule,
            ProgressBarModule,
            RadioButtonModule,
            RatingModule,
            SelectButtonModule,
            SidebarModule,
            ScrollerModule,
            ScrollPanelModule,
            ScrollTopModule,
            SkeletonModule,
            SliderModule,
            SpeedDialModule,
            SplitterModule,
            StepperModule,
            SplitButtonModule,
            StepsModule,
            TableModule,
            TabMenuModule,
            TagModule,
            TerminalModule,
            TieredMenuModule,
            TimelineModule,
            ToastModule,
            ToggleButtonModule,
            ToggleSwitchModule,
            ToolbarModule,
            TooltipModule,
            TreeModule,
            TreeSelectModule,
            TreeTableModule,
            CardModule,
            RippleModule,
            StyleClassModule,
            FloatLabelModule,
            IconFieldModule,
            InputIconModule,
            AutoFocusModule,
            OverlayBadgeModule,
          ],
      providers: [  ]
    })
    export class ImportsModule {}
    