
package com.libraryhub.service;

import com.libraryhub.dto.BookDto;
import com.libraryhub.exception.ResourceNotFoundException;
import com.libraryhub.model.Book;
import com.libraryhub.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDto> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookDto::fromEntity)
                .collect(Collectors.toList());
    }

    public BookDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        
        return BookDto.fromEntity(book);
    }
    
    public List<BookDto> searchBooks(String query) {
        return bookRepository.searchBooks(query).stream()
                .map(BookDto::fromEntity)
                .collect(Collectors.toList());
    }
    
    public BookDto createBook(BookDto bookDto) {
        Book book = BookDto.toEntity(bookDto);
        Book savedBook = bookRepository.save(book);
        return BookDto.fromEntity(savedBook);
    }
    
    public BookDto updateBook(Long id, BookDto bookDto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setIsbn(bookDto.getIsbn());
        book.setGenre(bookDto.getGenre());
        book.setDescription(bookDto.getDescription());
        book.setCoverImage(bookDto.getCoverImage());
        book.setAvailable(bookDto.getAvailable());
        
        Book updatedBook = bookRepository.save(book);
        return BookDto.fromEntity(updatedBook);
    }
    
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        
        bookRepository.delete(book);
    }
}
