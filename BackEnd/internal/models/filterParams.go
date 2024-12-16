package models

// FilterParams представляет параметры для фильтрации резюме.
type FilterParams struct {
	Title  string   // Название резюме (поиск по подстроке)
	Spec   string   // Специализация
	Tags   []string // Теги (поиск по любому из указанных тегов)
	UserID string   // Фильтр по пользователю
}
