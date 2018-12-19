/**
 * Created by vaio on 2/20/2016.
 */
/**
 * Kendo UI v2016.1.112 (http://www.telerik.com/kendo-ui)
 * Copyright 2016 Telerik AD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
















 */
!function (e) {
    "function" == typeof define && define.amd ? define(["./kendo.core"], e) : e()
}(function () {
    !function (e, t) {
        kendo.ui.FlatColorPicker && (kendo.ui.FlatColorPicker.prototype.options.messages = e.extend(!0, kendo.ui.FlatColorPicker.prototype.options.messages, {
            apply: "Хэрэглэх",
            cancel: "Болих"
        })), kendo.ui.ColorPicker && (kendo.ui.ColorPicker.prototype.options.messages = e.extend(!0, kendo.ui.ColorPicker.prototype.options.messages, {
            apply: "Хэрэглэх",
            cancel: "Болих"
        })), kendo.ui.ColumnMenu && (kendo.ui.ColumnMenu.prototype.options.messages = e.extend(!0, kendo.ui.ColumnMenu.prototype.options.messages, {
            sortAscending: "Өсөхөөр",
            sortDescending: "Буурахаар",
            filter: "Шүүлтүүр",
            columns: "Багана",
            done: "Дууссан",
            settings: "Баганы тохиргоо",
            lock: "Түгжих",
            unlock: "Тайлах"
        })), kendo.ui.Editor && (kendo.ui.Editor.prototype.options.messages = e.extend(!0, kendo.ui.Editor.prototype.options.messages, {
            bold: "Тод",
            italic: "Налуу",
            underline: "Зураастай",
            strikethrough: "Strikethrough",
            superscript: "Superscript",
            subscript: "Subscript",
            justifyCenter: "Голд нь",
            justifyLeft: "Зүүн талруу",
            justifyRight: "Баруун талруу",
            justifyFull: "Justify",
            insertUnorderedList: "Дараалалгүй жагсаалт оруулах",
            insertOrderedList: "Дараалсан жагсаалт оруулах",
            indent: "Догол мөр",
            outdent: "Outdent",
            createLink: "Цахим холбоос оруулах",
            unlink: "Цахим холбоосыг устгах",
            insertImage: "Зураг оруулах",
            insertFile: "Файл оруулах",
            insertHtml: "HTML оруулах",
            viewHtml: "HTML харах",
            fontName: "Фонтоо сонгоно уу",
            fontNameInherit: "(Фонт)",
            fontSize: "Фонтны хэмжээг сонгоно уу",
            fontSizeInherit: "(Хэмжээ)",
            formatBlock: "Формат",
            formatting: "Формат",
            foreColor: "Өнгө",
            backColor: "Арын өнгө",
            style: "Загвар",
            emptyFolder: "Хоосон хавтас",
            uploadFile: "Байршуулах",
            orderBy: "Эрэмбэлэх:",
            orderBySize: "Хэмжээ",
            orderByName: "Нэр",
            invalidFileType: 'Сонгосон "{0}" файл нь хүчингүй байна. Боломжит файлын төрөл нь {1}.',
            deleteFile: '"{0}"-ийг устгах уу?',
            overwriteFile: '"{0}" файл нь энэ хавтаст аль хэдийн үүссэн байна. Дарж хуулах уу?',
            directoryNotFound: "Ийм нэртэй хавтас байхгүй байна.",
            imageWebAddress: "Вэб хаяг",
            imageAltText: "Хувьсах текст",
            imageWidth: "Өргөн (px)",
            imageHeight: "Өндөр (px)",
            fileWebAddress: "Вэб хаяг",
            fileTitle: "Нэр",
            linkWebAddress: "Вэб хаяг",
            linkText: "Текст",
            linkToolTip: "ToolTip",
            linkOpenInNewWindow: "Шинэ цонхонд холбоосыг нээнэ үү",
            dialogUpdate: "Шинэчлэх",
            dialogInsert: "Оруулах",
            dialogButtonSeparator: "эсвэл",
            dialogCancel: "Болих",
            createTable: "Хүснэгт үүсгэх",
            addColumnLeft: "Зүүн талд багана нэмэх",
            addColumnRight: "Баруун талд багана нэмэх",
            addRowAbove: "Дээд талд мөр нэмэх",
            addRowBelow: "Доод талд мөр нэмэх",
            deleteRow: "Мөр устгах",
            deleteColumn: "Багана устгах"
        })), kendo.ui.FileBrowser && (kendo.ui.FileBrowser.prototype.options.messages = e.extend(!0, kendo.ui.FileBrowser.prototype.options.messages, {
            uploadFile: "Байршуулах",
            orderBy: "Эрэмбэлэх",
            orderByName: "Нэр",
            orderBySize: "Хэмжээ",
            directoryNotFound: "Ийм нэртэй хавтас байхгүй байна.",
            emptyFolder: "Хоосон хавтас",
            deleteFile: '"{0}"-ийг устгах уу?',
            invalidFileType: 'Сонгосон "{0}" файл нь хүчингүй байна. Боломжит файлын төрөл нь {1}.',
            overwriteFile: '"{0}" файл нь энэ хавтаст аль хэдийн үүссэн байна. Дарж хуулах уу?',
            dropFilesHere: "Байршуулах файлаа энэ оруулна уу",
            search: "Хайлт"
        })), kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.messages = e.extend(!0, kendo.ui.FilterCell.prototype.options.messages, {
            isTrue: "Үнэн",
            isFalse: "Худал",
            filter: "Шүүлтүүр",
            clear: "Арилгах",
            operator: "Оператор"
        })), kendo.ui.FilterCell && (kendo.ui.FilterCell.prototype.options.operators = e.extend(!0, kendo.ui.FilterCell.prototype.options.operators, {
            string: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                startswith: "Эхлэх утга",
                contains: "Агуулсан",
                doesnotcontain: "Агуулаагүй",
                endswith: "Төгсөх утга"
            },
            number: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                gte: "Их эсвэл тэнцүү",
                gt: "Их",
                lte: "Бага  эсвэл тэнцүү",
                lt: "Бага"
            },
            date: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                gte: "Дараагийн эсвэл тэнцүү",
                gt: "Дараагийн",
                lte: "Өмнөх эсвэл тэнцүү",
                lt: "Өмнөх"
            },
            enums: {eq: "Тэнцүү", neq: "Тэнцүү биш"}
        })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.messages = e.extend(!0, kendo.ui.FilterMenu.prototype.options.messages, {
            info: "Дараах утга бүхий өгөгдлийг харуулна:",
            isTrue: "Үнэн",
            isFalse: "Худал",
            filter: "Шүүлтүүр",
            clear: "Арилгах",
            and: "болон",
            or: "эсвэл",
            selectValue: "-Утгыг сонгох-",
            operator: "Оператор",
            value: "Утга",
            cancel: "Болих"
        })), kendo.ui.FilterMenu && (kendo.ui.FilterMenu.prototype.options.operators = e.extend(!0, kendo.ui.FilterMenu.prototype.options.operators, {
            string: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                startswith: "Эхлэх утга",
                contains: "Агуулсан",
                doesnotcontain: "Агуулаагүй",
                endswith: "Төгсөх утга"
            },
            number: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                gte: "Их эсвэл тэнцүү",
                gt: "Их",
                lte: "Бага эсвэл тэнцүү",
                lt: "Бага"
            },
            date: {
                eq: "Тэнцүү",
                neq: "Тэнцүү биш",
                gte: "Дараагийн эсвэл тэнцүү",
                gt: "Дараагийн",
                lte: "Өмнөх эсвэл тэнцүү",
                lt: "Өмнөх"
            },
            enums: {eq: "Тэнцүү", neq: "Тэнцүү биш"}
        })), kendo.ui.FilterMultiCheck && (kendo.ui.FilterMultiCheck.prototype.options.messages = e.extend(!0, kendo.ui.FilterMultiCheck.prototype.options.messages, {
            checkAll: "Бүгдийг сонгох",
            clear: "Арилгах",
            filter: "Шүүлтүүр"
        })), kendo.ui.Gantt && (kendo.ui.Gantt.prototype.options.messages = e.extend(!0, kendo.ui.Gantt.prototype.options.messages, {
            actions: {
                addChild: "Хүү нэмэх",
                append: "Таск нэмэх",
                insertAfter: "Доор нэмэх",
                insertBefore: "Дээр нэмэх",
                pdf: "PDF-т экспортлох"
            },
            cancel: "Болих",
            deleteDependencyWindowTitle: "Хамааралтайг устгах",
            deleteTaskWindowTitle: "Таск устгах",
            destroy: "Устгах",
            editor: {
                assingButton: "Оноох",
                editorTitle: "Taск",
                end: "Төгсөх",
                percentComplete: "Дуусах",
                resources: "Нөөц",
                resourcesEditorTitle: "Нөөц",
                resourcesHeader: "Нөөц",
                start: "Эхлэх",
                title: "Нэр",
                unitsHeader: "Нэгж"
            },
            save: "Хадгалах",
            views: {day: "Өдөр", end: "Төгсөх", month: "Сар", start: "Эхлэх", week: "7 хоног", year: "Жил"}
        })), kendo.ui.Grid && (kendo.ui.Grid.prototype.options.messages = e.extend(!0, kendo.ui.Grid.prototype.options.messages, {
            commands: {
                cancel: "Өөрчлөлтийг болих",
                canceledit: "Болих",
                create: "Шинээр өгөгдөл нэмэх",
                destroy: "Устгах",
                edit: "Засах",
                excel: "MS Excel-т экспортлох",
                pdf: "PDF-т экспортлох",
                save: "Өөрчлөлтийг хадгалах",
                select: "Сонгох",
                update: "Шинэчлэх"
            },
            editable: {
                cancelDelete: "Болих",
                confirmation: "Энэ өгөгдлийг устгах уу?",
                confirmDelete: "Устгах"
            },
            noRecords: "Ямар нэгэн өгөгдөл байхгүй."
        })), kendo.ui.Groupable && (kendo.ui.Groupable.prototype.options.messages = e.extend(!0, kendo.ui.Groupable.prototype.options.messages, {empty: "Бүлэглэж харах баганаа энд авч ирнэ үү"})), kendo.ui.NumericTextBox && (kendo.ui.NumericTextBox.prototype.options = e.extend(!0, kendo.ui.NumericTextBox.prototype.options, {
            upArrowText: "Өсөх утга",
            downArrowText: "Буурах утга"
        })), kendo.ui.Pager && (kendo.ui.Pager.prototype.options.messages = e.extend(!0, kendo.ui.Pager.prototype.options.messages, {
            allPages: "Бүх",
            display: "{2}-ийн {0} - {1} ",
            empty: "Дэлгэц дээр харах өгөгдөл байхгүй байна.",
            page: "Хуудас",
            of: "{0}-ийн",
            itemsPerPage: "Нэг хуудсанд",
            first: "Эхний хуудсанд очих",
            previous: "Өмнөх хуудсанд очих",
            next: "Дараагийн хуудсанд очих",
            last: "Сүүлийн хуудсанд очих",
            refresh: "Сэргээх",
            morePages: "Нэмэлт хуудаснууд"
        })), kendo.ui.PivotGrid && (kendo.ui.PivotGrid.prototype.options.messages = e.extend(!0, kendo.ui.PivotGrid.prototype.options.messages, {
            measureFields: "Өгөгдлийн талбарыг энд авч  ирнэ үү",
            columnFields: "Баганы талбарыг энд авч ирнэ үү",
            rowFields: "Мөрний талбарыг энд авч ирнэ үү"
        })), kendo.ui.PivotFieldMenu && (kendo.ui.PivotFieldMenu.prototype.options.messages = e.extend(!0, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            info: "Дараах утга бүхий өгөгдлийг харуулна:",
            filterFields: "Шүүлтүүрийн талбар",
            filter: "Шүүлтүүр",
            include: "Агуулах талбарууд...",
            title: "Хамрагдах талбарууд",
            clear: "Арилгах",
            ok: "Ok",
            cancel: "Болих",
            operators: {
                contains: "Агуулсан",
                doesnotcontain: "Агуулаагүй",
                startswith: "Эхлэх утга",
                endswith: "Төгсөх утга",
                eq: "Тэнцүү",
                neq: "Тэнцүү биш"
            }
        })), kendo.ui.RecurrenceEditor && (kendo.ui.RecurrenceEditor.prototype.options.messages = e.extend(!0, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            frequencies: {
                never: "Хэзээ ч",
                hourly: "Цагын",
                daily: "Өдрийн",
                weekly: "7 хоногийн",
                monthly: "Сарын",
                yearly: "Жилийн"
            },
            hourly: {repeatEvery: "Давтамж: ", interval: " цаг"},
            daily: {repeatEvery: "Давтамж: ", interval: " өдөр"},
            weekly: {interval: " 7 хоног", repeatEvery: "Давтамж: ", repeatOn: "Давтах: "},
            monthly: {repeatEvery: "Давтамж: ", repeatOn: "Давтах: ", interval: " сар", day: "Өдөр "},
            yearly: {repeatEvery: "Давтамж: ", repeatOn: "Давтах: ", interval: " жил", of: " - "},
            end: {
                label: "Төгсөх:",
                mobileLabel: "Төгсөх",
                never: "Хэзээ ч ",
                after: "Дараа нь ",
                occurrence: " тохиолдол",
                on: "Дээр "
            },
            offsetPositions: {first: "Эхний", second: "Хоёрдахь", third: "Гуравдахь", fourth: "Дөрөвдэхь", last: "Сүүлийн"},
            weekdays: {day: "өдөр", weekday: "7 хоногийн өдөр", weekend: "амралтын өдөр"}
        })), kendo.ui.Scheduler && (kendo.ui.Scheduler.prototype.options.messages = e.extend(!0, kendo.ui.Scheduler.prototype.options.messages, {
            allDay: "бүх өдөр",
            date: "Огноо",
            event: "Үйл явдал",
            time: "Цаг",
            showFullDay: "Бүтэн өдрийг харах",
            showWorkDay: "Ажлын цагийг харах",
            today: "Өнөөдөр",
            save: "Хадгалах",
            cancel: "Болих",
            destroy: "Устгах",
            deleteWindowTitle: "Үйл явдлыг устгах",
            ariaSlotLabel: "{0:t} - {1:t} хүртэл сонгосон",
            ariaEventLabel: "{0} ийн {1:D} - {2:t}",
            editable: {confirmation: "Энэ үйл явдлыг устгах уу?"},
            views: {day: "Өдөр", week: "7 хоног", workWeek: "Ажлын 7 хоног", agenda: "Сэдэв", month: "Сар"},
            recurrenceMessages: {
                deleteWindowTitle: "Давтагдсан өгөгдлийг устгах",
                deleteWindowOccurrence: "Тухайн тохиолдыг устгах",
                deleteWindowSeries: "Цувралыг устгах",
                editWindowTitle: "Давтагдсан өгөгдлийг засах=",
                editWindowOccurrence: "Тухайн тохиолдлыг засах",
                editWindowSeries: "Цувралыг засах",
                deleteRecurring: "Бүх цувралын эсвэл зөвхөн энэ тохиолдлыг устгах уу?",
                editRecurring: "Бүх цувралын эсвэл зөвхөн энэ тохиолдлыг засах уу?"
            },
            editor: {
                title: "Нэр",
                start: "Эхлэх",
                end: "Төгсгөх",
                allDayEvent: "Бүх өдрийн үйл явдал",
                description: "Тайлбар",
                repeat: "Давтах",
                timezone: " ",
                startTimezone: "Эхлэх цагийн бүс",
                endTimezone: "Төгсөх цагийн бүс",
                separateTimezones: "Эхлэх болон төгсөх өөр өөр цагийн бүс ашиглах",
                timezoneEditorTitle: "Цагийн бүсүүд",
                timezoneEditorButton: "Цагийн бүс",
                timezoneTitle: "Цагийн бүсүүд",
                noTimezone: "Цагийн бүс байхгүй",
                editorTitle: "Үйл явдал"
            }
        })), kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette && (kendo.spreadsheet.messages.borderPalette = e.extend(!0, kendo.spreadsheet.messages.borderPalette, {
            allBorders: "Бүх хил",
            insideBorders: "Хилийн дотор",
            insideHorizontalBorders: "Хэвтээ бүсийн дотор",
            insideVerticalBorders: "Босоо бүсийн дотор",
            outsideBorders: "Хилийн гадна",
            leftBorder: "Хилийн зүүн ",
            topBorder: "Хилийн дээд",
            rightBorder: "Хилийн баруун",
            bottomBorder: "Хилийн доод",
            noBorders: "Хил байхгүй",
            reset: "Өнгийг дахин оруулах",
            customColor: "Сонгосон өнгө...",
            apply: "Хэрэглэх",
            cancel: "Болих"
        })), kendo.spreadsheet && kendo.spreadsheet.messages.dialogs && (kendo.spreadsheet.messages.dialogs = e.extend(!0, kendo.spreadsheet.messages.dialogs, {
            apply: "Хэрэглэх",
            save: "Хадгалах",
            cancel: "Болих",
            remove: "Устгах",
            okText: "OK",
            formatCellsDialog: {title: "Формат", categories: {number: "Тоо", currency: "Нэгж", date: "Огноо"}},
            fontFamilyDialog: {title: "Фонт"},
            fontSizeDialog: {title: "Фонтны хэмжээ"},
            bordersDialog: {title: "Хил"},
            alignmentDialog: {
                title: "Тохируулга",
                buttons: {
                    justtifyLeft: "Зүүн",
                    justifyCenter: "Төв",
                    justifyRight: "Баруун",
                    justifyFull: "Тохируулах",
                    alignTop: "Дээд",
                    alignMiddle: "Дунд",
                    alignBottom: "Доод"
                }
            },
            mergeDialog: {
                title: "Нэгтгэх",
                buttons: {
                    mergeCells: "Бүгдийг нэгтгэх",
                    mergeHorizontally: "Хэвтээгээр нэгтгэх",
                    mergeVertically: "Босоогоор нэгтгэх",
                    unmerge: "Нэгтгэлийг болих"
                }
            },
            freezeDialog: {
                title: "Царцаах",
                buttons: {
                    freezePanes: "Царцаах",
                    freezeRows: "Мөрийг царцаах",
                    freezeColumns: "Баганыг царцаах",
                    unfreeze: "Царцаалтыг болих"
                }
            },
            validationDialog: {
                title: "Өгөгдөл баталгаажуулалт",
                hintMessage: "{0} - {1} хүчинтэй утга оруулна уу.",
                hintTitle: "Баталгаажуулалт {0}",
                criteria: {
                    any: "Ямар нэгэн утга",
                    number: "Тоо",
                    text: "Текст",
                    date: "Огноо",
                    custom: "Хэрэглэгчийн утга ",
                    list: "Жагсаалт"
                },
                comparers: {
                    greaterThan: "их",
                    lessThan: "бага",
                    between: "хооронд",
                    notBetween: "хооронд биш",
                    equalTo: "тэнцүү",
                    notEqualTo: "тэнцүү биш",
                    greaterThanOrEqualTo: "их эсвэл тэнцүү",
                    lessThanOrEqualTo: "бага эсвэл тэнцүү"
                },
                comparerMessages: {
                    greaterThan: "{0} -их",
                    lessThan: "{0}-бага",
                    between: "{0} - {1} хооронд",
                    notBetween: "{0} - {1} хооронд биш",
                    equalTo: "{0}-тэнцүү",
                    notEqualTo: "{0}-тэнцүү биш",
                    greaterThanOrEqualTo: "{0}-их эсвэл тэнцүү ",
                    lessThanOrEqualTo: "{0}-бага эсвэл тэнцүү",
                    custom: " хангасан: {0}"
                },
                labels: {
                    criteria: "Шалгуур үзүүлэлт",
                    comparer: "Харьцуулалт",
                    min: "Бага",
                    max: "Их",
                    value: "Утга",
                    start: "Эхлэх",
                    end: "Төгсөх",
                    onInvalidData: "Буруу утга",
                    rejectInput: "Татгалзах",
                    showWarning: "Анхааруулга",
                    showHint: "Сануулга харуулах",
                    hintTitle: "Сануулгын нэр",
                    hintMessage: "Сануулга",
                    ignoreBlank: "Хоосныг алгасах"
                },
                placeholders: {typeTitle: "Нэрний төрөл", typeMessage: "Мессежийн төрөл"}
            },
            saveAsDialog: {title: "Хадгалах...", labels: {fileName: "Файлын нэр", saveAsType: "Хадгалах төрөл"}},
            exportAsDialog: {
                title: "Экспорт...",
                labels: {
                    fileName: "Файлын нэр",
                    saveAsType: "Хадгалах төрөл",
                    exportArea: "Экспорт",
                    paperSize: "Цаасны хэмжээ",
                    margins: "Margins",
                    orientation: "Orientation",
                    print: "Хэвлэх",
                    guidelines: "Guidelines",
                    center: "Төв",
                    horizontally: "Хэвтээ",
                    vertically: "Босоо"
                }
            },
            modifyMergedDialog: {errorMessage: "Нэгтгэсэн өгөгдлөөс өөрчлөх боломжгүй."},
            useKeyboardDialog: {
                title: "Хуулах болон наах",
                errorMessage: "Үүнийг цэс ашиглан дуудах боломжгүй тул гарын shortcut ашиглана уу:",
                labels: {forCopy: "хуулах", forCut: "тасдах", forPaste: "наах"}
            },
            unsupportedSelectionDialog: {errorMessage: "Хэд хэдэн сонголттой бол хийх боломжгүй."}
        })), kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu && (kendo.spreadsheet.messages.filterMenu = e.extend(!0, kendo.spreadsheet.messages.filterMenu, {
            sortAscending: "A - Z эрэмбэлэх",
            sortDescending: "Z - A эрэмбэлэх",
            filterByValue: "Шүүлтүүр хийх утга",
            filterByCondition: "Шүүлтүүр хийх нөхцөл",
            apply: "Хэрэглэх",
            search: "Хайх",
            addToCurrent: "Тухайн сонголтыг нэмэх",
            clear: "Арилгах",
            blanks: "(Хоосон)",
            operatorNone: "Байхгүй",
            and: "БОЛОН",
            or: "ЭСВЭЛ",
            operators: {
                string: {
                    contains: "Агуулсан",
                    doesnotcontain: "Агуулаагүй",
                    startswith: "Эхлэх",
                    endswith: "Дуусах"
                },
                date: {eq: "Огноо", neq: "Огноо биш", lt: "Өмнөх", gt: "Дараах"},
                number: {
                    eq: "Тэнцүү",
                    neq: "Тэнцүү биш",
                    gte: "Их эсвэл тэнцүү",
                    gt: "Их",
                    lte: "Бага эсвэл тэнцүү",
                    lt: "Бага"
                }
            }
        })), kendo.spreadsheet && kendo.spreadsheet.messages.toolbar && (kendo.spreadsheet.messages.toolbar = e.extend(!0, kendo.spreadsheet.messages.toolbar, {
            addColumnLeft: "Зүүн талд багана нэмэх",
            addColumnRight: "Баруун талд багана нэмэх",
            addRowAbove: "Дээд талд мөр нэмэх",
            addRowBelow: "Доод талд мөр нэмэх",
            alignment: "Тохируулга",
            alignmentButtons: {
                justtifyLeft: "Зүүн",
                justifyCenter: "Төв",
                justifyRight: "Баруун",
                justifyFull: "Тохируулах",
                alignTop: "Дээд",
                alignMiddle: "Дунд",
                alignBottom: "Доод"
            },
            backgroundColor: "Ар тал",
            bold: "Тод",
            borders: "Хил",
            colorPicker: {reset: "Өнгийг дахих", customColor: "Хэрэглэгчийн өнгө..."},
            copy: "Хуулах",
            cut: "Тасдах",
            deleteColumn: "Багана устгах",
            deleteRow: "Мөр устгах",
            excelImport: "Excel-ээс импортлох",
            filter: "Шүүлтүүр",
            fontFamily: "Фонт",
            fontSize: "Фонтны хэмжээ",
            format: "Хэрэглэгчийн формат...",
            formatTypes: {
                automatic: "Автомат",
                number: "Тоо",
                percent: "Хувь",
                financial: "Санхүүгийн",
                currency: "Мөнгө",
                date: "Огноо",
                time: "Цаг",
                dateTime: "Огноо цаг",
                duration: "Хугацаа",
                moreFormats: "Илүү их формат..."
            },
            formatDecreaseDecimal: "Аравтаар бууруулах",
            formatIncreaseDecimal: "Аравтаар өсгөх",
            freeze: "Царцаах",
            freezeButtons: {
                freezePanes: "Царцаах",
                freezeRows: "Мөр царцаах",
                freezeColumns: "Багана царцаах",
                unfreeze: "Царцаалтыг болих"
            },
            italic: "Ташуу",
            merge: "Нэгтгэх",
            mergeButtons: {
                mergeCells: "Бүгдийг нэгтгэх",
                mergeHorizontally: "Хэвтээгээр нэгтгэх",
                mergeVertically: "Босоогоор нэгтгэх",
                unmerge: "Нэгтгэлийг болих"
            },
            open: "Нээх...",
            paste: "Наах",
            quickAccess: {redo: "Дахин хийх", undo: "Буцаах"},
            saveAs: "Хадгалах...",
            sortAsc: "Өсөхөөр эрэмбэлэх",
            sortDesc: "Буурахаар эрэмбэлэх",
            sortButtons: {
                sortSheetAsc: "A - Z эрэмбэлэх",
                sortSheetDesc: "Z - A эрэмбэлэх",
                sortRangeAsc: "A - Z эрэмбэлэх",
                sortRangeDesc: "Z - A эрэмбэлэх"
            },
            textColor: "Текстийн өнгө",
            textWrap: "Текст wrap",
            underline: "Доогуур нь зурах",
            validation: "Өгөгдлийн баталгаажуулалт..."
        })), kendo.spreadsheet && kendo.spreadsheet.messages.view && (kendo.spreadsheet.messages.view = e.extend(!0, kendo.spreadsheet.messages.view, {
            errors: {
                shiftingNonblankCells: "Өгөгдлийг алдах боломжтой тул оруулах боломжгүй. Өөр байршил сонгох эсвэл worksheet-ийн төгсгөлөөс өгөгдлөө устгана уу.",
                filterRangeContainingMerges: "Нэгтгэсэн интервалд шүүлтүүр үүсгэх боломжгүй",
                validationError: "Оруулсан өгөгдөл баталгаажуулалтын журмыг зөрчсөн байна."
            }, tabs: {home: "Эхлэл", insert: "Оруулах", data: "Өгөгдөл"}
        })), kendo.ui.Slider && (kendo.ui.Slider.prototype.options = e.extend(!0, kendo.ui.Slider.prototype.options, {
            increaseButtonTitle: "Өсөх",
            decreaseButtonTitle: "Буурах"
        })), kendo.ui.TreeList && (kendo.ui.TreeList.prototype.options.messages = e.extend(!0, kendo.ui.TreeList.prototype.options.messages, {
            noRows: "Дэлгэцэнд харуулах өгөгдөл байхгүй",
            loading: "Ачаалж байна...",
            requestFailed: "Хүсэлт амжилтгүй.",
            retry: "Дахих",
            commands: {
                edit: "Засах",
                update: "Шинэчлэх",
                canceledit: "Болих",
                create: "Шинэ өгөгдөл нэмэх",
                createchild: "Хүү бичлэг нэмэх",
                destroy: "Устгах",
                excel: "Excel-т экспортлох",
                pdf: "PDF-т экспортлох"
            }
        })), kendo.ui.TreeView && (kendo.ui.TreeView.prototype.options.messages = e.extend(!0, kendo.ui.TreeView.prototype.options.messages, {
            loading: "Ачаалж байна...",
            requestFailed: "Хүсэлт амжилтгүй.",
            retry: "Дахих"
        })), kendo.ui.Upload && (kendo.ui.Upload.prototype.options.localization = e.extend(!0, kendo.ui.Upload.prototype.options.localization, {
            select: "Файлаа сонгоно уу...",
            cancel: "Болих",
            retry: "Дахих",
            remove: "Устгах",
            uploadSelectedFiles: "Файл байршуулах",
            dropFilesHere: "Байршуулах файлаа энд авч ирнэ үү",
            statusUploading: "Байршуулж байна",
            statusUploaded: "Байршуулсан",
            statusWarning: "Анхааруулга",
            statusFailed: "Амжилтгүй",
            headerStatusUploading: "Байршуулж байна...",
            headerStatusUploaded: "Амжилттай"
        })), kendo.ui.Validator && (kendo.ui.Validator.prototype.options.messages = e.extend(!0, kendo.ui.Validator.prototype.options.messages, {
            required: "{0}-шаардлагатай",
            pattern: "{0} -хүчингүй",
            min: "{0} нь {1} -их эсвэл тэнцүү байх ёстой",
            max: "{0} нь {1}-бага эсвэл тэнцүү байх ёстой",
            step: "{0} -хүчингүй",
            email: "{0} хүчингүй и-мэйл хаяг",
            url: "{0} хүчингүй URL",
            date: "{0} хүчингүй огноо",
            dateCompare: "Төгсөх огноо нь эхлэх огнооноос их эсвэл тэнцүү байх ёстой"
        }))
    }(window.kendo.jQuery)
});
//# sourceMappingURL=kendo.messages.en-US.min.js.map