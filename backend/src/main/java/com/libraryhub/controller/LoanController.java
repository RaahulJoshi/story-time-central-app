
package com.libraryhub.controller;

import com.libraryhub.dto.LoanDto;
import com.libraryhub.service.LoanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/loans")
public class LoanController {
    
    private final LoanService loanService;
    
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }
    
    @GetMapping
    @PreAuthorize("hasAnyAuthority('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<List<LoanDto>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<LoanDto>> getCurrentUserLoans() {
        return ResponseEntity.ok(loanService.getCurrentUserLoans());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LoanDto> getLoanById(@PathVariable Long id) {
        return ResponseEntity.ok(loanService.getLoanById(id));
    }
    
    @PostMapping
    public ResponseEntity<LoanDto> borrowBook(@RequestBody Map<String, Long> request) {
        Long bookId = request.get("bookId");
        return new ResponseEntity<>(loanService.borrowBook(bookId), HttpStatus.CREATED);
    }
    
    @PostMapping("/{id}/return")
    public ResponseEntity<LoanDto> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(loanService.returnBook(id));
    }
}
