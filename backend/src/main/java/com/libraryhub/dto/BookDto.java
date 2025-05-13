
package com.libraryhub.dto;

import com.libraryhub.model.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String published;
    private String genre;
    private String description;
    private String coverImage;
    private Integer available;
    
    public static BookDto fromEntity(Book book) {
        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setIsbn(book.getIsbn());
        
        if (book.getPublished() != null) {
            dto.setPublished(book.getPublished().format(DateTimeFormatter.ISO_DATE));
        }
        
        dto.setGenre(book.getGenre());
        dto.setDescription(book.getDescription());
        dto.setCoverImage(book.getCoverImage());
        dto.setAvailable(book.getAvailable());
        
        return dto;
    }
    
    public static Book toEntity(BookDto dto) {
        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setIsbn(dto.getIsbn());
        
        if (dto.getPublished() != null && !dto.getPublished().isEmpty()) {
            book.setPublished(LocalDate.parse(dto.getPublished()));
        }
        
        book.setGenre(dto.getGenre());
        book.setDescription(dto.getDescription());
        book.setCoverImage(dto.getCoverImage());
        book.setAvailable(dto.getAvailable());
        
        return book;
    }
}
