
package com.libraryhub.dto;

import com.libraryhub.model.Loan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDto {
    
    private Long id;
    private Long userId;
    private Long bookId;
    private BookDto book;
    private String borrowDate;
    private String dueDate;
    private String returnDate;
    private String status;
    
    public static LoanDto fromEntity(Loan loan) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
        
        LoanDto dto = new LoanDto();
        dto.setId(loan.getId());
        dto.setUserId(loan.getUser().getId());
        dto.setBookId(loan.getBook().getId());
        dto.setBook(BookDto.fromEntity(loan.getBook()));
        dto.setBorrowDate(loan.getBorrowDate().format(formatter));
        dto.setDueDate(loan.getDueDate().format(formatter));
        
        if (loan.getReturnDate() != null) {
            dto.setReturnDate(loan.getReturnDate().format(formatter));
        } else {
            dto.setReturnDate(null);
        }
        
        dto.setStatus(loan.getStatus().name());
        
        return dto;
    }
}
