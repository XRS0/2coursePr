package models

// FilterParams представляет параметры для фильтрации резюме.
type FilterParams struct {
	Specs []string `form:"spec"`
	Tags  []string `form:"tags"`
}
