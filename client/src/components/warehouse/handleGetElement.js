const handlGetElement = (data) => {
  return data.map((item, index) => {
    return (
      <Fragment key={item.id}>
        {editValue.id === item.id ? (
          <EditItemWarehouse
            editValue={editValue}
            handleCancelClick={handleCancelClick}
            handleEditFormChange={handleEditFormChange}
            handleEditFormSubmit={handleEditFormSubmit}
            handleDeleteClick={handleDeleteClick}
            handleAddSubmit={handleAddSubmit}
            project={project}
            module={module}
            element={element}
            user={user}
            handleEditSelect={handleEditSelect}
            editSelectProjectById={editSelect.project}
            editSelectModuleById={editSelect.module}
            editSelectElementById={editSelect.element}
            editSelectUserById={editSelect.user}
            editSelectDateById={editSelect.dataStart}
          />
        ) : (
          <ReadItemWarehouse
            warehouse={item}
            index={index}
            project={project}
            module={module}
            user={user}
            element={element}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            showPdfFile={showPdfFile}
          />
        )}
      </Fragment>
    );
  });
};
