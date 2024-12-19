package models

// FilterParams представляет параметры для фильтрации резюме.
type FilterParams struct {
	Spec string   `form:"spec"`
	Tags []string `form:"tags"`
}
