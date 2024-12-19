package models

// FilterParams представляет параметры для фильтрации резюме.
type FilterParams struct {
	Spec string   // Специализация
	Tags []string // Теги (поиск по любому из указанных тегов)
}
