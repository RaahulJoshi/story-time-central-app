
package com.libraryhub.service;

import com.libraryhub.dto.LoanDto;
import com.libraryhub.exception.ApiException;
import com.libraryhub.exception.ResourceNotFoundException;
import com.libraryhub.model.Book;
import com.libraryhub.model.Loan;
import com.libraryhub.model.User;
import com.libraryhub.repository.BookRepository;
import com.libraryhub.repository.LoanRepository;
import com.libraryhub.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public LoanService(LoanRepository loanRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<LoanDto> getAllLoans() {
        return loanRepository.findAll().stream()
                .map(LoanDto::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<LoanDto> getCurrentUserLoans() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        List<Loan> loans = loanRepository.findByUser(user);
        return loans.stream()
                .map(LoanDto::fromEntity)
                .collect(Collectors.toList());
    }
    
    public LoanDto getLoanById(Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan", "id", id));
        
        return LoanDto.fromEntity(loan);
    }
    
    @Transactional
    public LoanDto borrowBook(Long bookId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", bookId));
        
        if (book.getAvailable() <= 0) {
            throw new ApiException("Book is not available for borrowing", HttpStatus.BAD_REQUEST);
        }
        
        book.setAvailable(book.getAvailable() - 1);
        bookRepository.save(book);
        
        LocalDate borrowDate = LocalDate.now();
        LocalDate dueDate = borrowDate.plusDays(14);  // 2 weeks loan period
        
        Loan loan = new Loan();
        loan.setUser(user);
        loan.setBook(book);
        loan.setBorrowDate(borrowDate);
        loan.setDueDate(dueDate);
        loan.setStatus(Loan.LoanStatus.BORROWED);
        
        Loan savedLoan = loanRepository.save(loan);
        return LoanDto.fromEntity(savedLoan);
    }
    
    @Transactional
    public LoanDto returnBook(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan", "id", loanId));
        
        if (loan.getStatus() == Loan.LoanStatus.RETURNED) {
            throw new ApiException("Book has already been returned", HttpStatus.BAD_REQUEST);
        }
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        // Check if the loan belongs to the current user or if user is admin/librarian
        if (!loan.getUser().getId().equals(user.getId()) && 
                !authentication.getAuthorities().stream().anyMatch(a -> 
                        a.getAuthority().equals("ADMIN") || a.getAuthority().equals("LIBRARIAN"))) {
            throw new ApiException("You don't have permission to return this book", HttpStatus.FORBIDDEN);
        }
        
        Book book = loan.getBook();
        book.setAvailable(book.getAvailable() + 1);
        bookRepository.save(book);
        
        loan.setReturnDate(LocalDate.now());
        loan.setStatus(Loan.LoanStatus.RETURNED);
        
        Loan updatedLoan = loanRepository.save(loan);
        return LoanDto.fromEntity(updatedLoan);
    }
    
    // Method to update overdue loans
    @Transactional
    public void updateOverdueLoans() {
        LocalDate today = LocalDate.now();
        List<Loan> loans = loanRepository.findAll();
        
        for (Loan loan : loans) {
            if (loan.getStatus() == Loan.LoanStatus.BORROWED && 
                    loan.getDueDate().isBefore(today)) {
                loan.setStatus(Loan.LoanStatus.OVERDUE);
                loanRepository.save(loan);
            }
        }
    }
}
